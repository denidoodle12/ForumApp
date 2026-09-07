import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { MessageSquare, Trophy, LogOut, MessagesSquare } from 'lucide-react'
import { asyncUnsetAuthUser } from '../../states/authUser/action'

function Navbar() {
  const { authUser } = useSelector((state) => state)
  const dispatch = useDispatch()
  const location = useLocation()

  function onLogout() {
    dispatch(asyncUnsetAuthUser())
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-icon">
            <MessagesSquare size={20} />
          </div>
          <span>Dicoding Forum</span>
        </Link>

        <nav className="navbar-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <MessageSquare size={18} />
            <span>Threads</span>
          </Link>
          <Link
            to="/leaderboards"
            className={`nav-link ${
              location.pathname === '/leaderboards' ? 'active' : ''
            }`}
          >
            <Trophy size={18} />
            <span>Leaderboards</span>
          </Link>
        </nav>

        <div className="navbar-auth">
          {authUser ? (
            <div className="user-profile-badge">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="user-avatar"
              />
              <span>{authUser.name}</span>
              <button
                type="button"
                onClick={onLogout}
                className="btn-icon"
                title="Keluar"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-secondary">
                Masuk
              </Link>
              <Link to="/register" className="btn btn-primary">
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
