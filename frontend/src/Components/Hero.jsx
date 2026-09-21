import {
  Search,
  Filter,
  Mic,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";

export default function Hero({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  activeJobsCount,
  onOpenVoiceRoom,
}) {
  const filterOptions = [
    { label: "All Jobs", value: "all" },
    { label: "Full Time", value: "fulltime" },
    { label: "Internship", value: "internship" },
    { label: "Remote", value: "remote" },
    { label: "Work From Home", value: "wfh" },
  ];

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-tag">
          <CheckCircle2 size={15} />
          <span>Verified off-campus jobs & internships curated daily</span>
        </div>

        <h1 className="hero-title">
          India&apos;s Premier{" "}
          <span className="gradient-text">Fresher Job Index</span>
        </h1>

        <p className="hero-subtitle">
          Find 2,400+ verified off-campus jobs, internships, work-from-home,
          and remote roles for 2023–2026 batch freshers. Updated every hour.
        </p>

        <button
          type="button"
          className="voiceroom-banner"
          onClick={onOpenVoiceRoom}
        >
          <span className="vr-banner-badge">
            <Mic size={16} />
            VoiceRoom Feature
          </span>

          <span className="vr-banner-text">
            <strong>Practice English & Technical Interviews Anonymously:</strong>
            {" "}Connect live with fellow freshers for free!
          </span>

          <span className="vr-banner-btn">
            Start Talking Now
            <Sparkles size={14} />
          </span>
        </button>

        <div className="search-box-wrapper">
          <div className="search-input-group">
            <Search className="search-icon" size={20} />

            <input
              type="search"
              placeholder="Search by job title, skill (e.g. React, Data Analyst, QA, Python)..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="search-input"
              aria-label="Search jobs by title or skill"
            />

            {searchTerm && (
              <button
                type="button"
                className="clear-search"
                aria-label="Clear job search"
                onClick={() => setSearchTerm("")}
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="filter-pills-row">
            <div className="filter-label">
              <Filter size={14} />
              <span>Quick Filter:</span>
            </div>

            <div className="pills-group">
              {filterOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`filter-pill ${
                    selectedType === option.value ? "active" : ""
                  }`}
                  onClick={() => setSelectedType(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <p className="jobs-found-count">
              <span>{activeJobsCount}</span> listings found
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}