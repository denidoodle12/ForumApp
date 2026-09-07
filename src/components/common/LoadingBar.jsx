import { useSelector } from 'react-redux'

function LoadingBar() {
  const loadingBar = useSelector((state) => state.loadingBar)

  if (loadingBar <= 0) {
    return null
  }

  return (
    <div className="loading-bar-container">
      <div className="loading-bar" />
    </div>
  )
}

export default LoadingBar
