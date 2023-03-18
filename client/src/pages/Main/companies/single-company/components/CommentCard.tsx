import moment from 'moment';
import { BsFillTrashFill } from 'react-icons/bs';

import { Comment } from '../../../../../models/comments.types';
import { useAppSelector } from '../../../../../redux/hooks';

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  const {
    user: { isAuthenticated, _id, role },
  } = useAppSelector((store) => store.user);

  return (
    <div className="comment-card" key={comment._id}>
      <div className="username-and-date">
        <span className="username">{comment.usernameAuthor}</span> &nbsp;
        <span className="date">{moment(comment.createdAt).format('M - YYYY')}</span>
      </div>
      <div className="comment-text">
        <p>{comment.text}</p>
      </div>
      {isAuthenticated && (_id === comment.author || role === 'admin') && (
        <button className="delete-comment-btn">
          <BsFillTrashFill />
        </button>
      )}
    </div>
  );
}
