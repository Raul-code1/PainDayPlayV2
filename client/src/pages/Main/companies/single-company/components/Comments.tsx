import { useGetAllCommentsForCompanyQuery } from '../../../../../redux/services/commentsApi';
import { CommentsContainer } from '../styled-components/comments';
import { CommentsForm, DisplayComments } from './';

type Props = {
  companyId: string;
};

export default function Comments({ companyId }: Props) {
  const { data: comments, isLoading } = useGetAllCommentsForCompanyQuery(companyId);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!comments) {
    return <h1>Something went wrong...</h1>;
  }

  console.log(comments);

  return (
    <CommentsContainer>
      {comments?.comments.length === 0 && (
        <h4>Esta instalacion deportiva no tiene comentarios de momento, se el primero en comentar.</h4>
      )}
      <CommentsForm />
      {comments.comments.length > 0 && <h4>Comentarios :</h4>}
      {comments?.comments.length > 0 && <DisplayComments comments={comments.comments} />}
    </CommentsContainer>
  );
}
