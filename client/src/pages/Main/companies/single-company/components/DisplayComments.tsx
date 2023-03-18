import { Comment } from '../../../../../models/comments.types';
import { DisplayCommentsContainer } from '../styled-components/display-comments';
import CommentCard from './CommentCard';

type Props = {
  comments: Comment[];
};

export default function DisplayComments({ comments }: Props) {
  console.log(comments);

  return (
    <DisplayCommentsContainer>
      <div className="comments-container">
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </div>
    </DisplayCommentsContainer>
  );
}
