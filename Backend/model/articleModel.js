import { mongoose } from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    source: {
      id: { type: String },
      name: { type: String },
    },
    author: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    urlToImage: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
    content: {
      type: String,
    },
    upvote: {
      type: Number,
      required: true,
    },
    downvote: {
      type: Number,
      required: true,
    },
    totalVotes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const articleModel = mongoose.model('articles', articleSchema);
export default articleModel;
