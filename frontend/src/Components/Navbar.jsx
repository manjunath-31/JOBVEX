import { Briefcase, Mic, BookOpen, Info, Mail, ShieldCheck, User, Sparkles } from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  isAdminAuthenticated,
  onLogoutAdmin
}) {
  return (
    <header className="jobvex-header">
      <div className="header-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => { setActiveTab("jobs"); }}>
          <div className="logo-icon">
            <Briefcase size={22} className="logo-svg" />
          </div>
          <div className="logo-text">
            <div className="brand-name">
              JOBVEX <span className="brand-badge">PRO</span>
            </div>
            <div className="brand-sub">India's #1 Job Index for Freshers</div>
          </div>
        </div>

        {/* Navigation Tabs (User Mode) */}
        {userRole === "user" ? (
          <nav className="nav-menu">
            <button
              className={`nav-item ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => setActiveTab("jobs")}
            >
              <Briefcase size={16} />
              <span>Jobs Index</span>
            </button>

            <button
              className={`nav-item voiceroom-item ${activeTab === "voiceroom" ? "active" : ""}`}
              onClick={() => setActiveTab("voiceroom")}
            >
              <Mic size={16} />
              <span>VoiceRoom</span>
              <span className="live-pill"><Sparkles size={10} /> NEW</span>
            </button>

            <button
              className={`nav-item ${activeTab === "blog" ? "active" : ""}`}
              onClick={() => setActiveTab("blog")}
            >
              <BookOpen size={16} />
              <span>Blog</span>
            </button>

            <button
              className={`nav-item ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              <Info size={16} />
              <span>About</span>
            </button>

            <button
              className={`nav-item ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              <Mail size={16} />
              <span>Contact</span>
            </button>
          </nav>
        ) : (
          /* Navigation Tabs (Admin Mode) */
          <div className="admin-nav-indicator">
            <ShieldCheck size={18} color="#10b981" />
            <span>Admin Dashboard Control Center</span>
          </div>
        )}

        {/* Role Switcher & Auth Controls */}
        <div className="header-actions">
          {isAdminAuthenticated && (
            <span className="admin-status-pill" title="Logged in as Platform Admin">
              👑 Admin Active
            </span>
          )}
          <div className="role-switcher-toggle">
            <button
              className={`role-btn ${userRole === "user" ? "active-role" : ""}`}
              onClick={() => {
                if (userRole === "admin" && isAdminAuthenticated) {
                  onLogoutAdmin();
                } else {
                  setUserRole("user");
                }
              }}
            >
              <User size={14} /> Job Seeker
            </button>
            <button
              className={`role-btn ${userRole === "admin" ? "active-role admin-accent" : ""}`}
              onClick={() => setUserRole("admin")}
            >
              <ShieldCheck size={14} /> Admin Portal
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
