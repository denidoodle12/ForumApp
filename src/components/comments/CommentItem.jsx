import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { postedAt } from '../../utils'

function CommentItem({
  content,
  createdAt,
  owner,
  upVotesBy = [],
  downVotesBy = [],
}) {
  return (
    <div className="comment-item-card">
      <div className="comment-header">
        <div className="comment-author-info">
          <img
            src={owner?.avatar}
            alt={owner?.name || 'Pengguna'}
            className="user-avatar"
          />
          <div>
            <span className="comment-author-name">
              {owner?.name || 'Anonim'}
            </span>
            <span className="comment-posted-at">{postedAt(createdAt)}</span>
          </div>
        </div>
      </div>

      <div
        className="comment-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="comment-footer">
        <div className="stat-badge">
          <ThumbsUp size={14} />
          <span>{upVotesBy.length}</span>
        </div>
        <div className="stat-badge">
          <ThumbsDown size={14} />
          <span>{downVotesBy.length}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
