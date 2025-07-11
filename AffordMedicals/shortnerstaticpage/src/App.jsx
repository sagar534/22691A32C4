import { useState } from 'react';
import './App.css';
const initialStats = [
  {
    shortUrl: 'https://short.ly/abc123',
    created: '2025-07-11 10:00:00',
    expiry: '2025-07-11 12:00:00',
    clicks: [
      { timestamp: '2025-07-11 10:05:12', source: 'Google' },
      { timestamp: '2025-07-11 10:15:44', source: 'Facebook' },
      { timestamp: '2025-07-11 11:01:22', source: 'Direct' },
    ],
  },
  {
    shortUrl: 'https://short.ly/xyz789',
    created: '2025-07-10 09:30:00',
    expiry: '2025-07-12 09:30:00',
    clicks: [
      { timestamp: '2025-07-10 10:00:00', source: 'Twitter' },
    ],
  },
];

function App() {
  const [stats] = useState(initialStats);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(120deg, #e0e7ff 0%, #fbc2eb 100%)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '0 0 auto', width: '100%', padding: '2rem 0', background: 'transparent' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.8rem', color: '#7c3aed', fontWeight: 800, margin: 0, letterSpacing: '1px' }}>Shortened URL Analytics Dashboard</h1>
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <div className="url-shortener-container" style={{ width: '100%', maxWidth: '1000px', margin: '2rem', borderRadius: '16px', boxShadow: '0 6px 24px rgba(99,102,241,0.10)', background: 'linear-gradient(135deg, #fdf6e3 0%, #e0e7ff 100%)' }}>
          {stats.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#888' }}>No shortened URLs found.</p>
          ) : (
            <div style={{ marginTop: '2rem' }}>
              {stats.map((item, idx) => (
                <div key={idx} className="url-entry" style={{ marginBottom: '2rem', background: 'linear-gradient(90deg, #e0e7ff 0%, #fbc2eb 100%)', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(124,58,237,0.08)' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Short URL:</strong> <a href={item.shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600 }}>{item.shortUrl}</a>
                  </div>
                  <div><strong>Created:</strong> {item.created}</div>
                  <div><strong>Expiry:</strong> {item.expiry}</div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong>Total Clicks:</strong> {item.clicks.length}
                  </div>
                  <div style={{ marginTop: '1rem', background: 'linear-gradient(90deg, #e0e7ff 0%, #bbf7d0 100%)', borderRadius: '8px', padding: '1rem', boxShadow: '0 1px 8px rgba(56,189,248,0.08)' }}>
                    <strong>Click Details:</strong>
                    {item.clicks.length === 0 ? (
                      <div style={{ color: '#888', marginTop: '0.5rem' }}>No clicks yet.</div>
                    ) : (
                      <table style={{ width: '100%', marginTop: '0.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 6px rgba(99,102,241,0.07)', overflow: 'hidden' }}>
                        <thead>
                          <tr style={{ background: 'linear-gradient(90deg, #e0e7ff 0%, #fbc2eb 100%)' }}>
                            <th style={{ padding: '14px', textAlign: 'left', color: '#7c3aed', fontWeight: 700 }}>Timestamp</th>
                            <th style={{ padding: '14px', textAlign: 'left', color: '#7c3aed', fontWeight: 700 }}>Source</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.clicks.map((click, cidx) => (
                            <tr key={cidx} style={{ background: cidx % 2 === 0 ? '#f3f4f6' : '#fff' }}>
                              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>{click.timestamp}</td>
                              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>{click.source}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
