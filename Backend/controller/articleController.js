import NewsAPI from "newsapi";
import articleModel from "../model/articleModel";

const getArticlesController = (req, res) => {
  const newsapi = new NewsAPI(process.env.News_API_KEY);
  newsapi.v2
    .topHeadlines({
      language: "en",
      pageSize: 10,
    })
    .then((response) => {
      console.log('articles', response);
      return res.status(200).send({
        success: true,
        message: "Articles fetched successfully",
        articles: response.articles
      });
    
      
      
    })
    .catch((e) => {
      console.log('error', e);
      return res.status(500).send({
        success: false,
        message: "unable to get articles",
        e,
      });
    });
};

export { getArticlesController };
