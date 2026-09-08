import CommentItem from './CommentItem';

function CommentList({ comments = [] }) {
  if (comments.length === 0) {
    return (
      <div className="empty-comments">
        <p>Belum ada komentar pada diskusi ini. Jadilah yang pertama berkomentar!</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}

export default CommentList;
