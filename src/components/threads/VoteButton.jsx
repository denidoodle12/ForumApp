import { ThumbsUp, ThumbsDown } from 'lucide-react'

function VoteButton({
  upVotesBy = [],
  downVotesBy = [],
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralize,
}) {
  const isUpvoted = authUserId ? upVotesBy.includes(authUserId) : false
  const isDownvoted = authUserId ? downVotesBy.includes(authUserId) : false

  function handleUpVote() {
    if (isUpvoted) {
      onNeutralize()
    } else {
      onUpVote()
    }
  }

  function handleDownVote() {
    if (isDownvoted) {
      onNeutralize()
    } else {
      onDownVote()
    }
  }

  return (
    <div className="vote-button-group">
      <button
        type="button"
        onClick={handleUpVote}
        className={`btn-vote ${isUpvoted ? 'voted-up' : ''}`}
        title="Suka"
      >
        <ThumbsUp size={15} fill={isUpvoted ? 'currentColor' : 'none'} />
        <span>{upVotesBy.length}</span>
      </button>

      <button
        type="button"
        onClick={handleDownVote}
        className={`btn-vote ${isDownvoted ? 'voted-down' : ''}`}
        title="Tidak Suka"
      >
        <ThumbsDown size={15} fill={isDownvoted ? 'currentColor' : 'none'} />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  )
}

export default VoteButton
