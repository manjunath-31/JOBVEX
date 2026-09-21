import { useEffect } from "react";
import {
  Building2,
  MapPin,
  DollarSign,
  ExternalLink,
  X,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const FALLBACK_LOGO =
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80";

const formatRoleType = (type) => {
  const roleTypes = {
    fulltime: "Full Time",
    internship: "Internship",
    remote: "Remote",
    wfh: "Work From Home",
  };

  return roleTypes[type] || "Not specified";
};

export default function JobDetailModal({ job, onClose, onApply }) {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  if (!job) {
    return null;
  }

  const handleApplyClick = () => {
    const applyUrl = job.applyUrl?.trim();

    if (!applyUrl) {
      toast.error("The official application link is not available for this job.");
      return;
    }

    toast.success(
      `Redirecting to ${job.company || "the company's"} official application portal.`
    );

    if (typeof onApply === "function") {
      onApply(job);
    }

    window.open(applyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="job-detail-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <section
        className="job-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-detail-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="job-detail-header">
          <div className="job-detail-company-info">
            <img
              src={job.companyLogo || FALLBACK_LOGO}
              alt={`${job.company || "Company"} logo`}
              className="job-detail-logo"
              onError={(event) => {
                event.currentTarget.src = FALLBACK_LOGO;
              }}
            />

            <div className="job-detail-heading">
              <div className="job-detail-company-tag">
                <Building2 size={14} />
                <span>{job.company || "Company name not available"}</span>

                {job.creatorBadge && (
                  <span className="job-detail-verified-tag">
                    <ShieldCheck size={13} />
                    {job.creatorBadge}
                  </span>
                )}
              </div>

              <h2 id="job-detail-modal-title" className="job-detail-title">
                {job.title || "Job title not available"}
              </h2>
            </div>
          </div>

          <button
            type="button"
            className="job-detail-close-btn"
            aria-label="Close job details"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>

        <div className="job-detail-body">
          <div className="job-detail-facts">
            <div className="job-detail-fact">
              <span className="job-detail-fact-label">Location</span>
              <span className="job-detail-fact-value">
                <MapPin size={14} />
                {job.location || "Not specified"}
              </span>
            </div>

            <div className="job-detail-fact">
              <span className="job-detail-fact-label">Salary / Stipend</span>
              <span className="job-detail-fact-value job-detail-salary">
                <DollarSign size={14} />
                {job.salary || "Not disclosed"}
              </span>
            </div>

            <div className="job-detail-fact">
              <span className="job-detail-fact-label">Eligible Batch</span>
              <span className="job-detail-fact-value">
                🎓 {job.batch || "2023–2026 Batch"}
              </span>
            </div>

            <div className="job-detail-fact">
              <span className="job-detail-fact-label">Role Type</span>
              <span className="job-detail-fact-value">
                {formatRoleType(job.type)}
              </span>
            </div>
          </div>

          <section className="job-detail-section">
            <h3>Job Description</h3>
            <p className="job-detail-description">
              {job.description || "No detailed job description is available."}
            </p>
          </section>

          {Array.isArray(job.requirements) && job.requirements.length > 0 && (
            <section className="job-detail-section">
              <h3>Key Requirements & Eligibility</h3>

              <ul className="job-detail-requirements">
                {job.requirements.map((requirement) => (
                  <li key={requirement}>
                    <CheckCircle2 size={16} />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <aside className="job-detail-creator-notice">
            <UserCheck size={19} />

            <div>
              <strong>
                Curated by {job.creatorName || "JOBVEX Creator Network"}
              </strong>

              <p>
                This listing was manually verified against the company&apos;s
                official career portal before being displayed on JOBVEX.
              </p>
            </div>
          </aside>
        </div>

        <footer className="job-detail-footer">
          <button
            type="button"
            className="job-detail-cancel-btn"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="job-detail-apply-btn"
            onClick={handleApplyClick}
          >
            Apply Now on Official Site
            <ExternalLink size={16} />
          </button>
        </footer>
      </section>
    </div>
  );
}