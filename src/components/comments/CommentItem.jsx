import { useDispatch, useSelector } from 'react-redux'
import { postedAt } from '../../utils'
import { asyncToggleVoteComment } from '../../states/detailThread/action'
import VoteButton from '../threads/VoteButton'

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy = [],
  downVotesBy = [],
}) {
  const authUser = useSelector((state) => state.authUser)
  const dispatch = useDispatch()

  function onUpVote() {
    dispatch(asyncToggleVoteComment({ commentId: id, voteType: 1 }))
  }

  function onDownVote() {
    dispatch(asyncToggleVoteComment({ commentId: id, voteType: -1 }))
  }

  function onNeutralize() {
    dispatch(asyncToggleVoteComment({ commentId: id, voteType: 0 }))
  }

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
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUser?.id}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralize={onNeutralize}
        />
      </div>
    </div>
  )
}

export default CommentItem
