import articleModel from "../model/articleModel.js";
import voteInfoModel from "../model/voteInfoModel.js";
import { seedDb } from "../utils/seeder.js";

// const getArticles

const getNewArticlesController = async (req, res) => {
  const { category } = req.body;
  await seedDb(category);
  getArticlesController(req, res);
};

const getArticlesController = async (req, res) => {
  try {
    const articles = await articleModel.find(
      {}
    ); /* .sort({ totalVotes: -1 }) */
    return res.status(200).send({
      status: true,
      message: "Articles fetched successfully!",
      data: articles,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Error occured while fetching articles!",
      error,
    });
  }
};

const updateVotesController = async (req, res) => {
  try {
    const { userId, articleId, voteStatus } = req.body;

    console.log("body =", { userId, articleId, voteStatus });

    const article = await articleModel.findById(articleId);
    const voteInfo = await voteInfoModel.findOne({ articleId, userId });

    console.log("voteinfo =", { voteInfo, article });

    if (voteInfo) {
      let newVote;
      if (voteStatus === "novote") {
        // console.log("reached ths point", voteInfo);
        newVote =
          voteInfo.voteStatus === "upvoted"
            ? { upvote: article.upvote - 1, downvote: article.downvote }
            : { upvote: article.upvote, downvote: article.downvote - 1 };

        await voteInfoModel.deleteOne({ _id: voteInfo._id });
        await articleModel.findByIdAndUpdate(articleId, {
          upvote: newVote.upvote,
          downvote: newVote.downvote,
          totalVotes: article.totalVotes - 1,
        });
      } else {
        newVote =
          voteStatus === "upvoted"
            ? { upvote: article.upvote + 1, downvote: article.downvote - 1 }
            : { upvote: article.upvote - 1, downvote: article.downvote + 1 };
        await articleModel.findByIdAndUpdate(articleId, {
          upvote: newVote.upvote,
          downvote: newVote.downvote,
        });
        await voteInfoModel.findByIdAndUpdate(voteInfo._id, { voteStatus });
      }
    } else {
      const newVote =
        voteStatus === "upvoted"
          ? { upvote: article.upvote + 1, downvote: article.downvote }
          : { upvote: article.upvote, downvote: article.downvote + 1 };

      await articleModel.findByIdAndUpdate(articleId, {
        upvote: newVote.upvote,
        downvote: newVote.downvote,
        totalVotes: article.totalVotes + 1,
      });

      await voteInfoModel.create({ articleId, userId, voteStatus });
    }

    return res.status(201).send({
      status: true,
      message: `Votes updated for articleId ${articleId}!`,
      data: { articleId, userId, voteStatus },
    });
  } catch (error) {
    console.log("Error updating votes!", error);
    return res.status(500).send({
      status: false,
      message: "Error updating votes!",
      error: error.message,
    });
  }
};

const getVotedStatus = async (req, res) => {
  try {
    const { userId, articleId } = req.body;
    const voteInfo = await voteInfoModel.findOne({ articleId, userId });

    return res.status(200).send({
      status: true,
      message: `Votes updated for articleId ${articleId}!`,
      data: { status: voteInfo ? voteInfo.voteStatus : "novote" },
    });
  } catch (error) {
    console.log("Error updating votes!", error);
    return res.status(500).send({
      status: false,
      message: "Error updating votes!",
      error,
    });
  }
};

export {
  getArticlesController,
  updateVotesController,
  getVotedStatus,
  getNewArticlesController,
};
