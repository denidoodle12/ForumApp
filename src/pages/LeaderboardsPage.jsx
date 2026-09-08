import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Trophy, Award, Medal, Zap } from 'lucide-react'
import { asyncReceiveLeaderboards } from '../states/leaderboards/action'

function LeaderboardsPage() {
  const { leaderboards = [], loadingBar = 0 } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards())
  }, [dispatch])

  function renderRankIcon(index) {
    if (index === 0) {
      return <Trophy size={20} className="rank-gold" />
    }
    if (index === 1) {
      return <Medal size={20} className="rank-silver" />
    }
    if (index === 2) {
      return <Award size={20} className="rank-bronze" />
    }
    return <span className="rank-number">{index + 1}</span>
  }

  return (
    <section className="leaderboards-page">
      <div className="page-header">
        <h1>Klasemen Pengguna Aktif</h1>
        <p>Pengguna paling berkontribusi dengan skor tertinggi di Dicoding Forum</p>
      </div>

      {leaderboards.length === 0 ? (
        <div className="empty-state">
          <p>
            {loadingBar > 0
              ? 'Memuat klasemen pengguna...'
              : 'Belum ada data klasemen pengguna.'}
          </p>
        </div>
      ) : (
        <div className="leaderboards-container">
          <div className="leaderboards-header-row">
            <span>Pengguna</span>
            <span>Skor Kontribusi</span>
          </div>

          <div className="leaderboards-list">
            {leaderboards.map((item, index) => (
              <div
                key={item.user.id}
                className={`leaderboard-item ${index < 3 ? 'top-rank' : ''}`}
              >
                <div className="leaderboard-user-col">
                  <div className="rank-badge-col">{renderRankIcon(index)}</div>
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="user-avatar"
                  />
                  <div className="leaderboard-user-info">
                    <span className="leaderboard-user-name">
                      {item.user.name}
                    </span>
                    <span className="leaderboard-user-email">
                      {item.user.email}
                    </span>
                  </div>
                </div>

                <div className="leaderboard-score-col">
                  <div className="score-pill">
                    <Zap size={14} />
                    <span>{item.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default LeaderboardsPage
