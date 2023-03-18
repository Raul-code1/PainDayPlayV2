/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';

import { CommentFormContainer } from '../styled-components/comment-form';
import { useAppSelector } from '../../../../../redux/hooks';
import { useForm } from 'react-hook-form';
import { useCreateCommentMutation } from '../../../../../redux/services/commentsApi';
import { toast } from 'react-toastify';

export default function CommentsForm() {
  const { companyId } = useParams();

  const {
    user: { isAuthenticated },
  } = useAppSelector((store) => store.user);

  const [createComment, { error: requestError }] = useCreateCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ text: string }>();

  async function onSubmit(formData: { text: string }) {
    const { text } = formData;
    if (!text) return;
    if (!companyId) return toast.error('Something went wrong');

    createComment({ text, companyId });
    setValue('text', '');
  }

  //todo: 401 error

  return (
    <CommentFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        {requestError && 'status' in requestError && requestError.status === 400 && 'data' in requestError && (
          <span className="form-error-msg response-msg">{requestError.data.msg}</span>
        )}
        <textarea
          placeholder="Escribe tu comentario sobre esta instalacion deportiva"
          disabled={!isAuthenticated}
          {...register('text', {
            maxLength: 200,
          })}
        ></textarea>
        {errors.text && <span className="form-error-msg">Comment must be under 200 characters</span>}
        {isAuthenticated ? (
          <button className="btn">submit</button>
        ) : (
          <Link className="link" to="/auth">
            Inicia sesion o registrate para empezar a comentar
          </Link>
        )}
      </form>
    </CommentFormContainer>
  );
}
