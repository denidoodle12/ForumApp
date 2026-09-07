import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPreloadProcess } from './states/isPreload/action'
import LoadingBar from './components/common/LoadingBar'
import Navbar from './components/common/Navbar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LeaderboardsPage from './pages/LeaderboardsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const isPreload = useSelector((state) => state.isPreload)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) {
    return (
      <div className="preload-container">
        <LoadingBar />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <LoadingBar />
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
