import { Building2, MapPin, DollarSign, Clock, ShieldCheck, ArrowRight, Eye, Users } from "lucide-react";

export default function JobCard({ job, onSelectJob }) {
  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "fulltime":
        return "badge-fulltime";
      case "internship":
        return "badge-internship";
      case "remote":
        return "badge-remote";
      case "wfh":
        return "badge-wfh";
      default:
        return "badge-default";
    }
  };

  const formatTypeName = (type) => {
    switch (type) {
      case "fulltime":
        return "Full Time";
      case "internship":
        return "Internship";
      case "remote":
        return "Remote";
      case "wfh":
        return "Work From Home";
      default:
        return type;
    }
  };

  return (
    <div className="job-card" onClick={() => onSelectJob(job)}>
      <div className="job-card-header">
        <div className="company-logo-box">
          <img
            src={job.companyLogo || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80"}
            alt={job.company}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80";
            }}
          />
        </div>
        <div className="job-title-block">
          <div className="company-name">
            <Building2 size={13} /> {job.company}
            {job.creatorBadge && (
              <span className="creator-badge" title="Curated by Verified Creator">
                <ShieldCheck size={12} color="#10b981" /> {job.creatorBadge}
              </span>
            )}
          </div>
          <h3 className="job-title">{job.title}</h3>
        </div>
        <span className={`type-badge ${getTypeBadgeClass(job.type)}`}>
          {formatTypeName(job.type)}
        </span>
      </div>

      <p className="job-description-snippet">{job.description}</p>

      <div className="job-meta-grid">
        <div className="meta-item">
          <MapPin size={14} className="meta-icon" />
          <span>{job.location}</span>
        </div>
        <div className="meta-item">
          <DollarSign size={14} className="meta-icon" />
          <span className="salary-text">{job.salary}</span>
        </div>
        <div className="meta-item">
          <Clock size={14} className="meta-icon" />
          <span>{job.postedAgo || "Recently"}</span>
        </div>
        <div className="meta-item batch-eligibility">
          <span>🎓 {job.batch || "2023-2026 Batch"}</span>
        </div>
      </div>

      <div className="job-card-footer">
        <div className="stats-row">
          <span className="stat-pill"><Eye size={12} /> {job.views || 120} views</span>
          <span className="stat-pill"><Users size={12} /> {job.applicationsCount || 45} applicants</span>
        </div>
        <button className="apply-btn" onClick={(e) => { e.stopPropagation(); onSelectJob(job); }}>
          View & Apply <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
