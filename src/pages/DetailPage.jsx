import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeft, Tag, ThumbsUp, ThumbsDown } from 'lucide-react'
import { asyncReceiveDetailThread } from '../states/detailThread/action'
import { postedAt } from '../utils'
import CommentInput from '../components/comments/CommentInput'
import CommentList from '../components/comments/CommentList'

function DetailPage() {
  const { id } = useParams()
  const detailThread = useSelector((state) => state.detailThread)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id))
  }, [id, dispatch])

  if (!detailThread) {
    return (
      <div className="empty-state">
        <p>Memuat rincian diskusi...</p>
      </div>
    )
  }

  return (
    <section className="detail-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        <span>Kembali ke Beranda</span>
      </Link>

      <article className="detail-thread-card">
        <header className="detail-thread-header">
          {detailThread.category && (
            <span className="thread-category-badge">
              <Tag size={12} />
              #{detailThread.category}
            </span>
          )}
          <h1 className="detail-thread-title">{detailThread.title}</h1>

          <div className="thread-author-info">
            <img
              src={detailThread.owner?.avatar}
              alt={detailThread.owner?.name || 'Pengguna'}
              className="user-avatar"
            />
            <div>
              <span className="thread-author-name">
                {detailThread.owner?.name || 'Anonim'}
              </span>
              <span className="thread-posted-at">
                {postedAt(detailThread.createdAt)}
              </span>
            </div>
          </div>
        </header>

        <div
          className="detail-thread-body"
          dangerouslySetInnerHTML={{ __html: detailThread.body }}
        />

        <footer className="detail-thread-footer">
          <div className="thread-stats">
            <div className="stat-badge">
              <ThumbsUp size={15} />
              <span>{detailThread.upVotesBy?.length || 0}</span>
            </div>
            <div className="stat-badge">
              <ThumbsDown size={15} />
              <span>{detailThread.downVotesBy?.length || 0}</span>
            </div>
          </div>
        </footer>
      </article>

      <section className="comments-section">
        <h2>Komentar ({detailThread.comments?.length || 0})</h2>
        <CommentInput threadId={id} />
        <CommentList comments={detailThread.comments} />
      </section>
    </section>
  )
}

export default DetailPage
