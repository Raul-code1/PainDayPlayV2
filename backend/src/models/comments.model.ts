import { Schema, model, Document, Types } from 'mongoose';

interface Comment {
  author: Types.ObjectId;
  companyId: Types.ObjectId;
  usernameAuthor: string;
  text: string;
}

interface CommentDocument extends Document, Comment {
  createdAt: string;
  updatedAt: string;
}

const CommentSchema = new Schema<CommentDocument>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    usernameAuthor: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CommentModel = model<CommentDocument>('Comment', CommentSchema);

export default CommentModel;
