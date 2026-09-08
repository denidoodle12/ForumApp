import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Tag } from 'lucide-react';
import { postedAt } from '../../utils';
import { asyncToggleVoteThread } from '../../states/threads/action';
import VoteButton from './VoteButton';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy = [],
  downVotesBy = [],
  totalComments = 0,
  user,
}) {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const strippedBody = body.replace(/<[^>]*>?/gm, '');
  const snippet =
    strippedBody.length > 180
      ? `${strippedBody.substring(0, 180)}...`
      : strippedBody;

  function onUpVote() {
    dispatch(asyncToggleVoteThread({ threadId: id, voteType: 1 }));
  }

  function onDownVote() {
    dispatch(asyncToggleVoteThread({ threadId: id, voteType: -1 }));
  }

  function onNeutralize() {
    dispatch(asyncToggleVoteThread({ threadId: id, voteType: 0 }));
  }

  return (
    <article className="thread-item-card">
      <div className="thread-item-header">
        <div className="thread-author-info">
          <img
            src={user?.avatar}
            alt={user?.name || 'Pengguna'}
            className="user-avatar"
          />
          <div>
            <span className="thread-author-name">
              {user?.name || 'Anonim'}
            </span>
            <span className="thread-posted-at">{postedAt(createdAt)}</span>
          </div>
        </div>
        {category && (
          <span className="thread-category-badge">
            <Tag size={12} />
            #{category}
          </span>
        )}
      </div>

      <div className="thread-item-content">
        <h2 className="thread-title">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h2>
        <p className="thread-snippet">{snippet}</p>
      </div>

      <div className="thread-item-footer">
        <div className="thread-stats">
          <VoteButton
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            authUserId={authUser?.id}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onNeutralize={onNeutralize}
          />
          <Link to={`/threads/${id}`} className="stat-badge stat-link">
            <MessageSquare size={15} />
            <span>{totalComments} Komentar</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ThreadItem;
