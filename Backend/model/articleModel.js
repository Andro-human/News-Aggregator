import { mongoose } from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    author: {
        type: String,
    },
    title: {
        type: String,
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
        type: number,
        required: true 
    },
    downvote: {
        type: number,
        required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("article", articleSchema);
