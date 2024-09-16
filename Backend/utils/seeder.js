import NewsAPI from 'newsapi';
import config from '../config/config.js';
import articleModel from '../model/articleModel.js';

const seedDb = async () => {
  try {
    await articleModel.deleteMany({});

    const newsapi = new NewsAPI(config.newsApiKey);
    const response = await newsapi.v2.topHeadlines({
      language: 'en',
      pageSize: 10,
    });

    const fetchedArticles = response.articles;
    const updatedArticles = fetchedArticles.map((article) => ({
      ...article,
      upvote: 0,
      downvote: 0,
      totalVotes: 0,
    }));

    // Add artices to database
    await articleModel.insertMany(updatedArticles);
    console.log('Articles database seeded!');
  } catch (error) {
    console.error('Error in seeding database', error);
  }
};

export { seedDb };
