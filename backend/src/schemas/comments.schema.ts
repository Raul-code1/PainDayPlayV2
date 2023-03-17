import { object, string, TypeOf } from 'zod';

const params = {
  params: object({
    companyId: string({
      required_error: 'Pleas provide company id',
    }),
  }),
};
const paramsComments = {
  params: object({
    commentId: string({
      required_error: 'Pleas provide company id',
    }),
  }),
};

export const createCommentSchema = object({
  body: object({
    text: string({ required_error: 'Please provide a comment' }).nonempty(),
    companyId: string({ required_error: 'Please provide a company id' }).nonempty(),
  }),
});

export const getAllCommentsSchema = object({
  ...params,
});
export const deleteCommentSchema = object({
  ...paramsComments,
});
export const updateCommentSchema = object({
  body: object({
    text: string({ required_error: 'Please provide a comment' }).nonempty(),
  }),
  ...paramsComments,
});

export type GetAllCommentsParams = TypeOf<typeof getAllCommentsSchema>;
export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
export type DeleteCommentParams = TypeOf<typeof deleteCommentSchema>;
export type UpdateCommentParams = TypeOf<typeof updateCommentSchema>;
