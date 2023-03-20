import moment from 'moment';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';

import { Comment } from '../../../../../models/comments.types';
import { useAppSelector } from '../../../../../redux/hooks';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '../../../../../redux/services/commentsApi';
import { toast } from 'react-toastify';
import { CommentCardContainer } from '../styled-components/comment-card';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  console.log(comment);

  const {
    user: { isAuthenticated, _id, role },
  } = useAppSelector((store) => store.user);

  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  function handleDeleteComment(commentId: string) {
    deleteComment(commentId);
    toast.success('Comment deleted');
  }

  const [toggleEditComment, setToggleEditComment] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ text: string }>({ defaultValues: { text: comment.text } });

  function onSubmit(formData: { text: string }) {
    const { text } = formData;
    console.log({ text, commentId: comment._id });

    updateComment({ text, commentId: comment._id });
    toast.success('Comentario actualizado');
    setToggleEditComment(false);
  }

  return (
    <CommentCardContainer>
      <div className="username-and-date">
        <span className="username">{comment.usernameAuthor}</span> &nbsp;
        <span className="date">{moment(comment.createdAt).format('M - YYYY')}</span>
      </div>
      <div className="comment-text">
        <p>{comment.text}</p>
      </div>
      {isAuthenticated && (_id === comment.author || role === 'admin') && (
        <button onClick={() => handleDeleteComment(comment._id)} className="delete-comment-btn">
          <BsFillTrashFill />
        </button>
      )}
      {isAuthenticated && (_id === comment.author || role === 'admin') && (
        <button onClick={() => setToggleEditComment(!toggleEditComment)} className="update-comment-btn">
          <FiEdit2 />
        </button>
      )}
      {toggleEditComment && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('text', {
              required: true,
              maxLength: 200,
            })}
            className="edit-comment-textarea"
          ></textarea>
          {errors.text && <span className="form-error-msg">Comment must be under 200 characters</span>}
          <div>
            <button className="btn">Editar comentario</button>
            <button type="button" className="btn btn-close" onClick={() => setToggleEditComment(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </CommentCardContainer>
  );
}
