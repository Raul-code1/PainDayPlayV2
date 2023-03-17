/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  CreateCommentInput,
  GetAllCommentsParams,
  UpdateCommentParams,
  DeleteCommentParams,
} from '../schemas/comments.schema';
import {
  createCommentService,
  deleteCommentService,
  findCommentByUserIdAndCompanyId,
  findCommentByUserIdAndId,
  getAllCommentsService,
  updateCommentService,
} from '../services/comments.services';
import { findCompanyById } from '../services/company.user.admin.services';
import checkPermissions from '../utils/check-permissions';

async function getAllComments(req: Request<GetAllCommentsParams['params']>, res: Response) {
  const { companyId } = req.params;

  const isCompanyExist = await findCompanyById(companyId);

  if (!isCompanyExist) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No company with id ${companyId}` });
  }
  const comments = await getAllCommentsService(companyId);

  return res.status(StatusCodes.OK).json({ comments, count: comments.length });
}

async function createComment(req: Request<any, any, CreateCommentInput['body']>, res: Response) {
  const { userId, name } = res.locals.user;

  console.log(res.locals.user);

  const { companyId, text } = req.body;

  const isCompanyExist = await findCompanyById(companyId);

  if (!isCompanyExist) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No company with id ${companyId}` });
  }

  const isCommentExist = await findCommentByUserIdAndCompanyId({ author: userId as string, companyId: companyId });
  if (isCommentExist) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No comment with ` });
  }

  const comment = await createCommentService({
    author: userId as string,
    companyId,
    text,
    usernameAuthor: name as string,
  });

  return res.status(StatusCodes.CREATED).json({ comment });
}

async function updateComment(
  req: Request<UpdateCommentParams['params'], any, UpdateCommentParams['body']>,
  res: Response,
) {
  const { userId, role } = res.locals.user;
  const { text } = req.body;
  const { commentId } = req.params;

  const comment = await findCommentByUserIdAndId({ author: userId as string, commentId });

  if (!comment) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No comment with id ${commentId}` });
  }

  const isUserAllowed = checkPermissions({
    requestUserId: userId as string,
    role: role as string,
    resourceId: comment.author.toString(),
  });

  if (!isUserAllowed) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'No authorized to update this comment' });
  }

  const options = {
    new: true,
  };

  const newText = {
    text,
  };

  const updatedComment = await updateCommentService({ commentId, newText, options });

  return res.status(StatusCodes.OK).json({ comment: updatedComment });
}
async function deleteComment(req: Request<DeleteCommentParams['params']>, res: Response) {
  const { commentId } = req.params;
  const { userId, role } = res.locals.user;

  const comment = await findCommentByUserIdAndId({ author: userId as string, commentId });

  if (!comment) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No comment with id ${commentId}` });
  }

  const isUserAllowed = checkPermissions({
    requestUserId: userId as string,
    role: role as string,
    resourceId: comment.author.toString(),
  });

  if (!isUserAllowed) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'No authorized to delete this comment' });
  }

  await deleteCommentService(commentId);

  return res.status(StatusCodes.OK).json({ comments: 'Deleted' });
}

export { getAllComments, createComment, updateComment, deleteComment };
