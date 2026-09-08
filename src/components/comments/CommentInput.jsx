import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncAddComment } from '../../states/detailThread/action';

function CommentInput({ threadId }) {
  const [content, setContent] = useState('');
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();
    const success = await dispatch(asyncAddComment({ threadId, content }));
    if (success) {
      setContent('');
    }
  }

  if (!authUser) {
    return (
      <div className="comment-login-prompt">
        <p>
          Ingin memberikan komentar?{' '}
          <Link to="/login" className="accent-link">
            Masuk ke akun Anda
          </Link>{' '}
          terlebih dahulu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="comment-input-form">
      <h3>Beri Komentar</h3>
      <textarea
        className="form-textarea"
        rows={3}
        placeholder="Tuliskan komentar atau tanggapan Anda..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="comment-input-actions">
        <button type="submit" className="btn btn-primary">
          Kirim Komentar
        </button>
      </div>
    </form>
  );
}

export default CommentInput;
