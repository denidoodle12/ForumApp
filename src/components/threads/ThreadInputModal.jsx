import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { X } from 'lucide-react'
import { asyncAddThread } from '../../states/threads/action'

function ThreadInputModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  const dispatch = useDispatch()

  if (!isOpen) {
    return null
  }

  async function onSubmit(event) {
    event.preventDefault()
    const success = await dispatch(asyncAddThread({ title, body, category }))
    if (success) {
      setTitle('')
      setCategory('')
      setBody('')
      onClose()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Buat Diskusi Baru</h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-icon"
            title="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Judul Diskusi
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              placeholder="Tuliskan judul yang menarik dan jelas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Kategori
            </label>
            <input
              id="category"
              type="text"
              className="form-input"
              placeholder="Contoh: react, redux, general"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="body">
              Isi Diskusi
            </label>
            <textarea
              id="body"
              className="form-textarea"
              rows={5}
              placeholder="Uraikan topik diskusi Anda secara rinci..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Publikasikan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ThreadInputModal
