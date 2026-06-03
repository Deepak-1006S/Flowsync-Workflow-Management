import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: '📊' },
    { to: '/workflows', label: 'Workflows', icon: '🔄' },
    { to: '/tasks', label: 'Tasks', icon: '📋' },
    { to: '/approvals', label: 'Approvals', icon: '✓' },
    { to: '/automation', label: 'Automation', icon: '⚙️' },
  ];

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, label, icon }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        isActive(to)
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      <span>{icon}</span>
      {label}
    </Link>
  );

  const pageTitle =
    location.pathname === '/' ? 'Dashboard' :
    location.pathname === '/workflows' ? 'Workflows' :
    location.pathname === '/tasks' ? 'Tasks' :
    location.pathname === '/approvals' ? 'Approvals' :
    location.pathname === '/automation' ? 'Automation' :
    'FlowSync';

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="layout-sidebar hidden w-80 flex-col border-r border-slate-200 bg-white shadow-sm md:flex">
        <div className="flex flex-col gap-2 px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-sky-500 text-xl font-bold text-white shadow-md">
              F
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">FlowSync</h1>
              <p className="text-sm text-slate-500">Enterprise workflow suite</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-50 p-4 text-sm text-slate-500">
            Build, automate, and approve processes with confidence.
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 pb-6">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} label={item.label} icon={item.icon} />
          ))}
        </nav>

        <div className="mb-6 px-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">D</div>
              <div>
                <p className="font-semibold text-sm text-slate-900">Deepak S.</p>
                <p className="text-xs text-slate-500">deepaksureshdeepak036@gmail.com</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-slate-500">
              <p>Team: Operations</p>
              <p>Status: Active</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">FlowSync</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{pageTitle}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="button-secondary">Notifications</button>
              <button
                onClick={() => navigate('/workflows?mode=builder')}
                className="button-primary"
              >
                Create Workflow
              </button>
            </div>
          </div>
        </header>

        <div className="min-h-[calc(100vh-96px)] overflow-auto p-6"> {children} </div>
      </main>
    </div>
  );
};

export default Layout;
