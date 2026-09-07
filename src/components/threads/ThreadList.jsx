import ThreadItem from './ThreadItem'

function ThreadList({ threads = [] }) {
  if (threads.length === 0) {
    return (
      <div className="empty-state">
        <p>Tidak ada diskusi yang ditemukan.</p>
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
