const PLATFORM_ICONS = {
  'WhatsApp':  '💬',
  'Twitter/X': '🐦',
  'Instagram': '📷',
  'Facebook':  '👥',
  'News':      '📰',
}

export default function PostCard({ post, onClick }) {
  const icon = PLATFORM_ICONS[post.platform] || '🔗'

  return (
    <div
      className={`card card-${post.label}`}
      onClick={() => onClick(post)}
      role="button"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span className={`badge badge-${post.label}`}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'currentColor', display: 'inline-block',
          }} />
          {post.label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)' }}>
          {post.confidence}%
        </span>
      </div>

      <p style={{
        fontSize: 14,
        color: 'var(--text)',
        lineHeight: 1.5,
        marginBottom: 12,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.content}
      </p>

      <div className="conf-track" style={{ marginBottom: 10 }}>
        <div
          className={`conf-fill conf-fill-${post.label}`}
          style={{ width: `${post.confidence}%` }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>
          {icon} {post.platform}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>
          {post.timeAgo}
        </span>
      </div>
    </div>
  )
}