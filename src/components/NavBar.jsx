export default function NavBar({ activeTab, onFeed, onExplore, onCreate, onActivity, onProfile }) {
  const tabs = [
    {
      id: 'feed', label: 'Home', onClick: onFeed,
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      id: 'explore', label: 'Discover', onClick: onExplore,
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
    },
    {
      id: 'create', label: 'Create', onClick: onCreate, isCenter: true,
      icon: () => (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      ),
    },
    {
      id: 'activity', label: 'Activity', onClick: onActivity,
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
    {
      id: 'profile', label: 'Profile', onClick: onProfile,
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
  ]

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => tab.isCenter ? (
        <button key={tab.id} className="nav-check-btn" onClick={tab.onClick} style={{ background: 'var(--accent)' }}>
          <div className="check-circle" style={{ background: 'var(--accent)' }}>{tab.icon()}</div>
        </button>
      ) : (
        <button
          key={tab.id}
          className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={tab.onClick}
          style={{ position: 'relative' }}
        >
          <div className="nav-icon">
            {tab.icon(activeTab === tab.id)}
          </div>
          {tab.hasDot && <span className="nav-dot" />}
          {tab.label}
        </button>
      ))}
    </nav>
  )
}