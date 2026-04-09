import { useState } from 'react'
import FeedScreen from './screens/FeedScreen'
import ExploreScreen from './screens/ExploreScreen'
import CreateScreen from './screens/CreateScreen'
import ActivityScreen from './screens/ActivityScreen'
import ProfileScreen from './screens/ProfileScreen'

import AnalyzeScreen from './screens/AnalyzeScreen'
import StudioScreen from './screens/StudioScreen'
import DetailScreen from './screens/DetailScreen'

import NavBar from './components/NavBar'
import './styles/app.css'

export default function App() {
  const [screen, setScreen] = useState('feed')
  const [selectedPost, setSelectedPost] = useState(null)
  const [activeTab, setActiveTab] = useState('feed')

  function goToDetail(post) {
    setSelectedPost(post)
    setScreen('detail')
  }

  function goToTab(tabName) {
    setActiveTab(tabName)
    setScreen(tabName)
  }

  function goToAnalyze() { setScreen('analyze') }
  function goToStudio() { setScreen('studio') }

  function goBack() {
    // Return to the last active base tab
    setScreen(activeTab)
  }

  return (
    <div className="app-shell">
      <div className="screen-container">
        {screen === 'feed'      && <FeedScreen onSelectPost={goToDetail} />}
        {screen === 'explore'   && <ExploreScreen />}
        {screen === 'create'    && <CreateScreen onScan={goToAnalyze} onRemix={goToStudio} onBack={() => goToTab('feed')} />}
        {screen === 'activity'  && <ActivityScreen onSelectPost={goToDetail} />}
        {screen === 'profile'   && <ProfileScreen onBack={goBack} />}
        
        {/* Sub-flows */}
        {screen === 'analyze'   && <AnalyzeScreen onBack={goBack} onResult={goToDetail} />}
        {screen === 'studio'    && <StudioScreen onBack={goBack} />}
        {screen === 'detail'    && <DetailScreen post={selectedPost} onBack={goBack} onRemix={goToStudio} />}
      </div>

      {(screen === 'feed' || screen === 'explore' || screen === 'create' || screen === 'activity' || screen === 'profile') && (
        <NavBar
          activeTab={activeTab}
          onFeed={() => goToTab('feed')}
          onExplore={() => goToTab('explore')}
          onCreate={() => goToTab('create')}
          onActivity={() => goToTab('activity')}
          onProfile={() => goToTab('profile')}
        />
      )}
    </div>
  )
}