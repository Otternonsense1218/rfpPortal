import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
  textDecoration: 'none',
  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
  fontSize: '14px',
  fontWeight: isActive ? 600 : 400,
  height: 'var(--nav-height)',
  display: 'flex',
  alignItems: 'center',
  padding: '0 4px',
  borderBottom: isActive ? '2px solid var(--ermc-main)' : '2px solid transparent',
  transition: 'color 0.15s',
});

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2);
}

export default function ShellLayout() {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleDark = () => {
    setIsDark(prev => !prev);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <div style={{ fontFamily: 'var(--font-main)', minHeight: '100vh', background: 'var(--ermc-main)' }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: 'var(--nav-padding)',
        height: 'var(--nav-height)',
        background: 'var(--ermc-dark)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginRight: 8 }}>
          <div style={{ width: '28px', height: '28px', position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'var(--ermc-main)',
              clipPath: 'polygon(33% 0%, 67% 0%, 67% 33%, 100% 33%, 100% 67%, 67% 67%, 67% 100%, 33% 100%, 33% 67%, 0% 67%, 0% 33%, 33% 33%)',
            }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontSize: '10px', color: 'var(--ermc-light)', fontWeight: 400, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Eaton Rapids Medical Center
            </span>
            <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 700 }}>
              RFP Portal
            </span>
          </div>
        </div>

        {/* Nav links */}
        <NavLink to="/" end style={navLinkStyle}>Dashboard</NavLink>
        <NavLink to="/new-request" style={navLinkStyle}>New Request</NavLink>
        <NavLink to="/requests" style={navLinkStyle}>My Requests</NavLink>
        <NavLink to="/approvals" style={navLinkStyle}>Approvals</NavLink>
        <NavLink to="/materials" style={navLinkStyle}>Materials</NavLink>
        <NavLink to="/vendors" style={navLinkStyle}>Vendors</NavLink>
        <NavLink to="/receiving" style={navLinkStyle}>Receiving</NavLink>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'rgba(255,255,255,0.65)', padding: 4 }} aria-label="Notifications">
            🔔
          </button>

          {/* Dark mode toggle: disabled for now since the design needs work, unsure if will actually be used}
          <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'rgba(255,255,255,0.65)', padding: 4 }} aria-label="Toggle theme">
            {isDark ? '🌞' : '🌙'}
          </button>
          */}

          {/* User avatar + menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserMenu(v => !v)}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'var(--ermc-main)', border: 'none', cursor: 'pointer',
                fontSize: '12px', fontWeight: 700, color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="User menu"
            >
              {user ? initials(user.displayName) : '?'}
            </button>

            {showUserMenu && (
              <div style={{
                position: 'absolute', top: '38px', right: 0,
                background: '#fff', borderRadius: 8, minWidth: 180,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 100,
                overflow: 'hidden',
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{user?.displayName}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{user?.role.replace('_', ' ')}</div>
                </div>
                <button
                  onClick={() => { setShowUserMenu(false); logout(); }}
                  style={{
                    width: '100%', textAlign: 'left', padding: '10px 16px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 13, color: '#a32d2d', fontFamily: 'inherit',
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main style={{ padding: 'var(--content-padding)' }}>
        <Outlet />
      </main>
    </div>
  );
}
