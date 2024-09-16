import { mongoose } from 'mongoose';

const voteInfoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'articles' },
    voteStatus: { type: String, required: true },
  },
  { timestamps: true }
);

const voteInfoModel = mongoose.model('voteInfo', voteInfoSchema);
export default voteInfoModel;
