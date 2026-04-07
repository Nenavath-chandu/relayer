export default function NavBar({ activeTab, onFeed, onAnalyze, onExplore, onShorts, onHistory }) {
  const tabs = [
    {
      id: 'feed', label: 'Home', onClick: onFeed,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      id: 'explore', label: 'Explore', onClick: onExplore,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      ),
    },
    {
      id: 'analyze', label: 'Check', onClick: onAnalyze, isCenter: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      ),
    },
    {
      id: 'shorts', label: 'Shorts', onClick: onShorts,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      ),
    },
    {
      id: 'history', label: 'History', onClick: onHistory,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
  ]

  return (
    <nav className="bottom-nav" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
      {tabs.map(tab => tab.isCenter ? (
        <button key={tab.id} className="nav-check-btn" onClick={tab.onClick}>
          <div className="check-circle">{tab.icon}</div>
          <span className="check-circle-label" style={{ fontSize: 11 }}>Check</span>
        </button>
      ) : (
        <button
          key={tab.id}
          className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={tab.onClick}
        >
          <div className="nav-icon">{tab.icon}</div>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}