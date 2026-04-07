import { useState } from 'react'
import FeedScreen from './screens/FeedScreen'
import AnalyzeScreen from './screens/AnalyzeScreen'
import DetailScreen from './screens/DetailScreen'
import ExploreScreen from './screens/ExploreScreen'
import ShortsScreen from './screens/ShortsScreen'
import NavBar from './components/NavBar'
import './styles/App.css'
import HistoryScreen from './screens/HistoryScreen'

export default function App() {
  const [screen, setScreen] = useState('feed')
  const [selectedPost, setSelectedPost] = useState(null)
  const [activeTab, setActiveTab] = useState('feed')

  function goToDetail(post) {
    setSelectedPost(post)
    setScreen('detail')
  }

  function goToFeed() {
    setActiveTab('feed')
    setScreen('feed')
  }

  function goToAnalyze() {
    setActiveTab('analyze')
    setScreen('analyze')
  }

  function goToExplore() {
    setActiveTab('explore')
    setScreen('explore')
  }

  function goToShorts() {
    setActiveTab('shorts')
    setScreen('shorts')
  }

  function goToHistory() {
    setActiveTab('history')
    setScreen('history')
  }

  function goBack() {
    if (activeTab === 'feed') setScreen('feed')
    else if (activeTab === 'analyze') setScreen('analyze')
    else if (activeTab === 'explore') setScreen('explore')
    else if (activeTab === 'shorts') setScreen('shorts')
    else setScreen('history')
  }

  return (
    <div className="app-shell">
      <div className="screen-container">
        {screen === 'feed'    && <FeedScreen onSelectPost={goToDetail} />}
        {screen === 'analyze' && <AnalyzeScreen onBack={goToFeed} onResult={goToDetail} />}
        {screen === 'explore' && <ExploreScreen />}
        {screen === 'shorts'  && <ShortsScreen onAnalyze={(url, file) => {
          goToAnalyze()
        }} />}
        {screen === 'detail'  && <DetailScreen post={selectedPost} onBack={goBack} />}
        {screen === 'history' && <HistoryScreen onSelectPost={goToDetail} />}
      </div>

      {screen !== 'detail' && (
        <NavBar
          activeTab={activeTab}
          onFeed={goToFeed}
          onAnalyze={goToAnalyze}
          onExplore={goToExplore}
          onShorts={goToShorts}
          onHistory={goToHistory}
        />
      )}
    </div>
  )
}