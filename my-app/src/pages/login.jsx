import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleSignIn = (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!email || !password) {
      setFeedback({ type: "error", message: "Please fill in your email and password." });
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setFeedback({ type: "error", message: "Enter a valid email address." });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(); // ← goes to dashboard
    }, 1000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          min-height: 100vh;
          background: #0b0f1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .lp-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(79,142,247,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .lp-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          opacity: .32;
        }
        .lp-orb-1 { width: 420px; height: 420px; background: #4f8ef7; top: -120px; left: -80px; }
        .lp-orb-2 { width: 340px; height: 340px; background: #a78bfa; bottom: -100px; right: -60px; }

        .lp-card {
          width: 100%;
          max-width: 420px;
          background: #111827;
          border: 1px solid #1e2a3a;
          border-radius: 20px;
          padding: 44px 40px 40px;
          position: relative;
          box-shadow: 0 0 0 1px rgba(255,255,255,.04), 0 24px 64px rgba(0,0,0,.5);
          animation: lp-rise .5s cubic-bezier(.22,1,.36,1) both;
          -webkit-font-smoothing: antialiased;
        }

        @keyframes lp-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 24px; right: 24px;
          height: 2px;
          background: linear-gradient(90deg, #4f8ef7, #a78bfa);
          border-radius: 0 0 4px 4px;
        }

        .lp-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; }
        .lp-brand-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #4f8ef7, #a78bfa);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .lp-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          background: linear-gradient(90deg, #4f8ef7, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.6rem;
          letter-spacing: -.02em;
          color: #e8edf5;
        }
        .lp-sub {
          color: #6b7a99;
          font-size: .88rem;
          margin-top: 5px;
          line-height: 1.5;
        }

        .lp-feedback {
          font-size: .82rem;
          padding: 9px 12px;
          border-radius: 8px;
          margin-top: 20px;
        }
        .lp-feedback.error   { background: rgba(248,113,113,.1); border: 1px solid rgba(248,113,113,.3); color: #f87171; }
        .lp-feedback.success { background: rgba(52,211,153,.1);  border: 1px solid rgba(52,211,153,.3);  color: #34d399; }

        .lp-form  { margin-top: 28px; display: flex; flex-direction: column; gap: 18px; }
        .lp-field { display: flex; flex-direction: column; gap: 7px; }
        .lp-label {
          font-size: .8rem; font-weight: 500;
          color: #6b7a99;
          letter-spacing: .04em; text-transform: uppercase;
        }

        .lp-input-wrap { position: relative; display: flex; align-items: center; }
        .lp-input-wrap .lp-field-icon {
          position: absolute; left: 14px;
          width: 16px; height: 16px;
          stroke: #6b7a99;
          pointer-events: none;
          transition: stroke .2s;
          flex-shrink: 0;
        }

        .lp-input {
          width: 100%;
          background: #151d2e;
          border: 1px solid #1e2a3a;
          border-radius: 10px;
          padding: 11px 14px 11px 40px;
          color: #e8edf5;
          font-family: 'Inter', sans-serif;
          font-size: .93rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .lp-input::placeholder { color: #3a4762; }
        .lp-input:focus {
          border-color: #4f8ef7;
          box-shadow: 0 0 0 3px rgba(79,142,247,.15);
        }

        .lp-eye-btn {
          position: absolute; right: 12px;
          background: none; border: none; cursor: pointer;
          padding: 4px; color: #6b7a99;
          display: flex; align-items: center;
          transition: color .2s;
        }
        .lp-eye-btn:hover { color: #e8edf5; }
        .lp-eye-btn svg { width: 16px; height: 16px; stroke: currentColor; }

        .lp-extras { display: flex; align-items: center; justify-content: space-between; margin-top: -4px; }
        .lp-remember { display: flex; align-items: center; gap: 8px; font-size: .83rem; color: #6b7a99; cursor: pointer; user-select: none; }
        .lp-remember input { width: 15px; height: 15px; accent-color: #4f8ef7; cursor: pointer; }
        .lp-forgot { font-size: .83rem; color: #4f8ef7; text-decoration: none; background: none; border: none; cursor: pointer; transition: opacity .2s; }
        .lp-forgot:hover { opacity: .75; }

        .lp-btn-submit {
          margin-top: 6px; width: 100%; padding: 12px;
          background: linear-gradient(135deg, #4f8ef7, #a78bfa);
          border: none; border-radius: 10px;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 600; font-size: .95rem;
          cursor: pointer; letter-spacing: .01em;
          transition: opacity .2s, transform .15s;
        }
        .lp-btn-submit:hover:not(:disabled) { opacity: .9; }
        .lp-btn-submit:active:not(:disabled) { transform: scale(.985); }
        .lp-btn-submit:disabled { opacity: .65; cursor: not-allowed; }

        .lp-divider { display: flex; align-items: center; gap: 12px; margin: 22px 0 0; }
        .lp-divider hr { flex: 1; border: none; border-top: 1px solid #1e2a3a; }
        .lp-divider span { font-size: .78rem; color: #6b7a99; }

        .lp-oauth { display: flex; gap: 10px; margin-top: 14px; }
        .lp-btn-oauth {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 12px;
          background: #151d2e; border: 1px solid #1e2a3a; border-radius: 10px;
          color: #e8edf5;
          font-family: 'Inter', sans-serif; font-size: .82rem; font-weight: 500;
          cursor: pointer;
          transition: background .2s, border-color .2s;
        }
        .lp-btn-oauth:hover { background: #1a2540; border-color: #2a3a56; }
        .lp-btn-oauth svg { width: 16px; height: 16px; }

        .lp-footer { text-align: center; margin-top: 24px; font-size: .83rem; color: #6b7a99; }
        .lp-footer a { color: #4f8ef7; text-decoration: none; }
        .lp-footer a:hover { text-decoration: underline; }

        @media (max-width: 480px) {
          .lp-card { padding: 36px 24px 32px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-card { animation: none; }
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-orb lp-orb-1" />
        <div className="lp-orb lp-orb-2" />

        <div className="lp-card">
          {/* Brand */}
          <div className="lp-brand">
            <div className="lp-brand-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="#fff">
                <path d="M10 2L3 7v6l7 5 7-5V7L10 2zm0 2.5L15 8v4l-5 3.5L5 12V8l5-3.5z"/>
              </svg>
            </div>
            <span className="lp-brand-name">MyProject</span>
          </div>

          {/* Heading */}
          <h1 className="lp-h1">Welcome back</h1>
          <p className="lp-sub">Sign in to continue to your dashboard.</p>

          {/* Feedback */}
          {feedback.message && (
            <div className={`lp-feedback ${feedback.type}`}>{feedback.message}</div>
          )}

          {/* Form */}
          <div className="lp-form">

            {/* Email */}
            <div className="lp-field">
              <label className="lp-label" htmlFor="lp-email">Email</label>
              <div className="lp-input-wrap">
                <input
                  className="lp-input"
                  id="lp-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSignIn(e)}
                />
                <svg className="lp-field-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </div>
            </div>

            {/* Password */}
            <div className="lp-field">
              <label className="lp-label" htmlFor="lp-password">Password</label>
              <div className="lp-input-wrap">
                <input
                  className="lp-input"
                  id="lp-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSignIn(e)}
                  style={{ paddingRight: "40px" }}
                />
                <svg className="lp-field-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <button
                  type="button"
                  className="lp-eye-btn"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 12a18.45 18.45 0 0 1 1.06-2.94M9.9 4.24A9.12 9.12 0 0 1 12 4c5 0 9.27 3.61 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07A3 3 0 1 1 9.88 9.88"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Extras */}
            <div className="lp-extras">
              <label className="lp-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button type="button" className="lp-forgot">Forgot password?</button>
            </div>

            {/* Submit */}
            <button
              className="lp-btn-submit"
              disabled={loading}
              onClick={handleSignIn}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

          </div>

          {/* Divider */}
          <div className="lp-divider">
            <hr /><span>or continue with</span><hr />
          </div>

          {/* OAuth */}
          <div className="lp-oauth">
            <button className="lp-btn-oauth">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3.1-4.3 3.1-7.1z" fill="#4285F4"/>
                <path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 1-3.5 1-2.7 0-4.9-1.8-5.7-4.2H3v2.5C4.7 19.9 8.1 22 12 22z" fill="#34A853"/>
                <path d="M6.3 13.9A6 6 0 0 1 6 12c0-.7.1-1.3.3-1.9V7.6H3A10 10 0 0 0 2 12c0 1.6.4 3.1 1 4.4l3.3-2.5z" fill="#FBBC05"/>
                <path d="M12 5.8c1.5 0 2.9.5 3.9 1.5l2.9-2.9C17 2.9 14.7 2 12 2 8.1 2 4.7 4.1 3 7.6l3.3 2.5C7.1 7.6 9.3 5.8 12 5.8z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="lp-btn-oauth">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12C22 6.48 17.52 2 12 2z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="lp-footer">
            Don't have an account? <a href="#">Create one</a>
          </p>

        </div>
      </div>
    </>
  );
}