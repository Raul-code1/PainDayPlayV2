export interface CommentsResponse {
  comments: Comment[];
  count: number;
}

export interface CreateCommentsResponse {
  comments: Comment[];
}

export interface UpdateCommentsResponse {
  comments: Comment[];
}

export interface DeleteCommentsResponse {
  msg: string;
}

export interface Comment {
  _id: string;
  author: string;
  companyId: string;
  usernameAuthor: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
