import { useEffect, useState } from "react";
import { getHistory } from "../data/history";

export default function HistoryScreen({ onSelectPost }) {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const labels = ['ALL', 'FAKE', 'MISLEADING', 'REAL', 'AI-GENERATED'];

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Normalize label (important for matching filters)
  const normalizeLabel = (result) => {
    if (!result) return "UNKNOWN";

    const r = result.toLowerCase();

    if (r.includes("fake")) return "FAKE";
    if (r.includes("misleading")) return "MISLEADING";
    if (r.includes("real")) return "REAL";
    if (r.includes("ai")) return "AI-GENERATED";

    return "UNKNOWN";
  };

  // Apply filter
  const filteredHistory =
    filter === "ALL"
      ? history
      : history.filter(item => normalizeLabel(item.result) === filter);

  return (
    <div className="screen">

      {/* HEADER */}
      <div className="header">
        <div className="header-row">
          <div>
            <div className="logo">History</div>
            <div className="header-sub">Your past checks</div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{
        display: 'flex',
        gap: 8,
        padding: '12px 16px',
        overflowX: 'auto',
        borderBottom: '1px solid var(--border)',
      }}>
        {labels.map(l => (
          <button
            key={l}
            onClick={() => setFilter(l)}
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              borderRadius: 99,
              border: '1px solid',
              fontSize: 12,
              cursor: 'pointer',
              background: filter === l ? 'var(--accent)' : 'var(--surface)',
              borderColor: filter === l ? 'var(--accent)' : 'var(--border)',
              color: filter === l ? '#fff' : 'var(--text2)',
            }}
          >
            {l === 'AI-GENERATED' ? 'AI-Gen' : l}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="feed-list">
        {filteredHistory.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🕒</div>
            <div className="empty-title">No results found</div>
            <div className="empty-sub">
              {history.length === 0
                ? "Analyze something to see it here."
                : "No items match this filter."}
            </div>
          </div>
        ) : (
          filteredHistory.map((item) => {
            const label = normalizeLabel(item.result);

            return (
              <div
                key={item.id}
                className={`card card-${label}`}
                onClick={() =>
                  onSelectPost({
                    id: item.id,
                    content: item.content,
                    label: label,
                    timeAgo: "Just now"
                  })
                }
              >
                {/* TOP ROW */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span className={`badge badge-${label}`}>
                    {label}
                  </span>

                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>
                    {item.type}
                  </span>
                </div>

                {/* CONTENT */}
                <div style={{ marginTop: 8 }}>
                  {item.content}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}