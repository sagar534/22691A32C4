import { useState } from 'react';
import './App.css';

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function App() {
  const [entries, setEntries] = useState([
    { longUrl: '', validity: '', shortcode: '', error: '', loading: false, result: null },
  ]);
  const [globalError, setGlobalError] = useState('');

  const handleChange = (idx, field, value) => {
    setEntries(prev => prev.map((entry, i) => i === idx ? { ...entry, [field]: value, error: '' } : entry));
  };

  const addEntry = () => {
    if (entries.length < 5) {
      setEntries([...entries, { longUrl: '', validity: '', shortcode: '', error: '', loading: false, result: null }]);
    }
  };

  const removeEntry = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
  };

  const validateEntry = (entry) => {
    if (!entry.longUrl) return 'Please enter a URL.';
    if (!isValidUrl(entry.longUrl)) return 'Invalid URL format.';
    if (entry.validity && (!/^\d+$/.test(entry.validity) || parseInt(entry.validity) <= 0)) return 'Validity must be a positive integer.';
    if (entry.shortcode && !/^[a-zA-Z0-9_-]{3,20}$/.test(entry.shortcode)) return 'Shortcode must be 3-20 characters (letters, numbers, - or _).';
    return '';
  };

  const handleShortenAll = async () => {
    setGlobalError('');
    let hasError = false;
    const newEntries = entries.map(entry => {
      const error = validateEntry(entry);
      if (error) hasError = true;
      return { ...entry, error };
    });
    setEntries(newEntries);
    if (hasError) {
      setGlobalError('Please fix errors before submitting.');
      return;
    }
    // Simulate API calls
    setEntries(prev => prev.map(entry => ({ ...entry, loading: true, error: '', result: null })));
    await new Promise(res => setTimeout(res, 1200));
    setEntries(prev => prev.map(entry => {
      // Simulate result
      const now = new Date();
      let expiry = null;
      if (entry.validity) {
        expiry = new Date(now.getTime() + parseInt(entry.validity) * 60000);
      }
      return {
        ...entry,
        loading: false,
        result: {
          shortUrl: 'https://short.ly/' + (entry.shortcode ? entry.shortcode : Math.random().toString(36).substring(7)),
          expiry: expiry ? expiry.toLocaleString() : 'Never',
        },
      };
    }));
  };

  return (
    <div className="url-shortener-container">
      <h1>URL Shortener</h1>
      {entries.map((entry, idx) => (
        <div key={idx} className="url-entry" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Enter long URL..."
              value={entry.longUrl}
              onChange={e => handleChange(idx, 'longUrl', e.target.value)}
              style={{ width: '40%', padding: '8px', fontSize: '1rem' }}
              disabled={entry.loading}
            />
            <input
              type="text"
              placeholder="Validity (min, optional)"
              value={entry.validity}
              onChange={e => handleChange(idx, 'validity', e.target.value)}
              style={{ width: '18%', padding: '8px', fontSize: '1rem' }}
              disabled={entry.loading}
            />
            <input
              type="text"
              placeholder="Preferred shortcode (optional)"
              value={entry.shortcode}
              onChange={e => handleChange(idx, 'shortcode', e.target.value)}
              style={{ width: '22%', padding: '8px', fontSize: '1rem' }}
              disabled={entry.loading}
            />
            {entries.length > 1 && (
              <button type="button" onClick={() => removeEntry(idx)} disabled={entry.loading} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer' }}>Remove</button>
            )}
          </div>
          {entry.error && <p style={{ color: 'red', marginTop: '6px' }}>{entry.error}</p>}
          {entry.result && (
            <div className="short-url-result" style={{ marginTop: '10px' }}>
              <div><strong>Short URL:</strong> <a href={entry.result.shortUrl} target="_blank" rel="noopener noreferrer">{entry.result.shortUrl}</a></div>
              <div><strong>Expiry:</strong> {entry.result.expiry}</div>
              <div><strong>Original:</strong> <span style={{ wordBreak: 'break-all' }}>{entry.longUrl}</span></div>
            </div>
          )}
        </div>
      ))}
      {entries.length < 5 && (
        <button type="button" onClick={addEntry} style={{ marginBottom: '1.5rem', background: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '1rem', cursor: 'pointer' }}>+ Add another URL</button>
      )}
      <button
        onClick={handleShortenAll}
        disabled={entries.some(e => e.loading)}
        style={{ marginTop: '10px', padding: '10px 24px', fontSize: '1.1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        {entries.some(e => e.loading) ? 'Shortening...' : 'Shorten All'}
      </button>
      {globalError && <p style={{ color: 'red', marginTop: '10px' }}>{globalError}</p>}
    </div>
  );
}

export default App;
