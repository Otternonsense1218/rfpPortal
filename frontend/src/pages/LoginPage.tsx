import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/');
    } catch {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.shell}>
      {/* Left brand panel */}
      <div style={styles.brand}>
        <div style={styles.brandInner}>
          <div style={styles.logoWrap}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
              <path
                d="M18 0h16v14h14v16H34v14H18V30H4V14h14V0z"
                fill="#6FA287"
                opacity="0.9"
              />
              <path
                d="M18 0h16v14h14v16H34v14H18V30H4V14h14V0z"
                stroke="#ADCAB8"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
          <h1 style={styles.brandName}>
            <span style={styles.brandSmall}>Eaton Rapids</span>
            <span style={styles.brandLarge}>Medical Center</span>
          </h1>
          <p style={styles.portalLabel}>RFP Portal</p>
          <div style={styles.divider} />
          <p style={styles.mission}>
            <em>Care. Serve. Inspire.</em>
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div style={styles.formPanel}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Sign In</h2>
          <p style={styles.cardSub}>Use your network username and password</p>

          <form onSubmit={handleSubmit} style={styles.form} noValidate>
            <label style={styles.label} htmlFor="username">Username</label>
            <input
              id="username"
              style={styles.input}
              type="text"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />

            <label style={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              style={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />

            {error && <p style={styles.errorMsg}>{error}</p>}

            <button style={loading ? { ...styles.btn, ...styles.btnDisabled } : styles.btn} type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p style={styles.helpText}>
            Having trouble? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif",
  },
  brand: {
    flex: '0 0 420px',
    background: '#0d3d3a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 40px',
  },
  brandInner: {
    color: '#fff',
    maxWidth: 320,
  },
  logoWrap: {
    marginBottom: 20,
  },
  brandName: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  brandSmall: {
    fontSize: 18,
    fontWeight: 400,
    letterSpacing: '0.02em',
    color: '#ADCAB8',
  },
  brandLarge: {
    fontSize: 32,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.1,
  },
  portalLabel: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#6FA287',
  },
  divider: {
    margin: '28px 0',
    height: 1,
    background: 'rgba(255,255,255,0.12)',
  },
  mission: {
    fontFamily: "'Times New Roman', Times, serif",
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 15,
    color: '#ADCAB8',
    margin: 0,
  },
  formPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f7f6',
    padding: 32,
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: '40px 44px',
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
  },
  cardTitle: {
    margin: '0 0 6px',
    fontSize: 24,
    fontWeight: 700,
    color: '#0d3d3a',
  },
  cardSub: {
    margin: '0 0 28px',
    fontSize: 14,
    color: '#6b7280',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    padding: '10px 12px',
    fontSize: 15,
    border: '1.5px solid rgba(0,0,0,0.15)',
    borderRadius: 8,
    marginBottom: 18,
    outline: 'none',
    fontFamily: 'inherit',
    color: '#1a1a1a',
    background: '#fff',
    transition: 'border-color 0.15s',
  },
  errorMsg: {
    fontSize: 13,
    color: '#a32d2d',
    background: '#fcebeb',
    borderRadius: 6,
    padding: '8px 12px',
    marginBottom: 16,
    margin: '0 0 16px',
  },
  btn: {
    marginTop: 4,
    padding: '12px 0',
    background: '#6FA287',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
    transition: 'background 0.15s',
  },
  btnDisabled: {
    background: '#ADCAB8',
    cursor: 'not-allowed',
  },
  helpText: {
    marginTop: 24,
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
};
