import articleModel from '../model/articleModel.js';
import voteInfoModel from '../model/voteInfoModel.js';

const getArticlesController = async (req, res) => {
  try {
    const articles = await articleModel.find({});
    return res.status(200).send({
      status: true,
      message: 'Articles fetched successfully!',
      data: articles,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: 'Error occured while fetching articles!',
      error,
    });
  }
};

const updateVotesController = async (req, res) => {
  try {
    const { userId, articleId, voteStatus } = req.body;

    const article = await articleModel.findById(articleId);
    const voteInfo = await voteInfoModel.findOne({ articleId, userId });

    console.log('voteinfo =', { voteInfo, article });

    if (voteInfo) {
      const newVote =
        voteStatus === 'upvoted'
          ? { upvote: article.upvote + 1, downvote: article.downvote - 1 }
          : { upvote: article.upvote - 1, downvote: article.downvote + 1 };

      await articleModel.findByIdAndUpdate(articleId, {
        upvote: newVote.upvote,
        downvote: newVote.downvote,
      });
    } else {
      const newVote =
        voteStatus === 'upvoted' ? { upvote: 1, downvote: 0 } : { upvote: 0, downvote: 1 };

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
    console.log('Error updating votes!', error);
    return res.status(500).send({
      status: false,
      message: 'Error updating votes!',
      error,
    });
  }
};

export { getArticlesController, updateVotesController };
