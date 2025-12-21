import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="app-header">
        <div className="logo-container">
          <Sparkles className="logo-icon" color="var(--secondary)" />
          <h1 className="logo-text">Cocok<span>Gak!</span></h1>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="app-footer">
        <p>© 2025 CocokGak! • Multimedia Systems Task</p>
      </footer>

      <style>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .app-header {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(10px);
          background: rgba(15, 23, 42, 0.5);
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          width: 24px;
          height: 24px;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .logo-text span {
          color: var(--secondary);
        }

        .main-content {
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .app-footer {
          padding: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
};

export default Layout;
