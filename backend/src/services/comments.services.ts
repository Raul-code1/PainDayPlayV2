import CommentModel from '../models/comments.model';

async function findCommentByUserIdAndCompanyId({ author, companyId }: { author: string; companyId: string }) {
  return await CommentModel.findOne({ author, companyId });
}

async function findCommentByUserIdAndId({ author, commentId }: { author: string; commentId: string }) {
  return await CommentModel.findOne({ author, commentId });
}

async function findCommentById({ commentId }: { commentId: string }) {
  return await CommentModel.findOne({ commentId });
}

async function createCommentService({
  text,
  companyId,
  author,
  usernameAuthor,
}: {
  text: string;
  companyId: string;
  author: string;
  usernameAuthor: string;
}) {
  return CommentModel.create({ text, companyId, author, usernameAuthor });
}

async function getAllCommentsService(companyId: string) {
  try {
    return CommentModel.find({ companyId });
  } catch (error) {
    throw new Error('AQUI EL ERRROR SDFDSFDSDFDS');
  }
}

async function updateCommentService({
  commentId,
  newText,
  options,
}: {
  commentId: string;
  newText: { text: string };
  options: { new: boolean };
}) {
  return CommentModel.findByIdAndUpdate({ _id: commentId }, newText, options);
}

async function deleteCommentService(commentId: string) {
  return CommentModel.deleteOne({ _id: commentId });
}

export {
  findCommentByUserIdAndCompanyId,
  createCommentService,
  getAllCommentsService,
  findCommentByUserIdAndId,
  updateCommentService,
  findCommentById,
  deleteCommentService,
};
