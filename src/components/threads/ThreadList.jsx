import { useSelector } from 'react-redux'
import ThreadItem from './ThreadItem'

function ThreadList({ threads = [] }) {
  const loadingBar = useSelector((state) => state.loadingBar)

  if (threads.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {loadingBar > 0
            ? 'Memuat daftar diskusi...'
            : 'Tidak ada diskusi yang ditemukan.'}
        </p>
      </div>
    )
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  )
}

export default ThreadList
