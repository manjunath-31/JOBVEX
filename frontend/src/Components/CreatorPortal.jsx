import { useState } from "react";
import { PlusCircle, Eye, DollarSign, Briefcase, ShieldCheck, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function CreatorPortal({ onAddJob }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "fulltime",
    batch: "2023-2026 Batch",
    location: "",
    salary: "",
    applyUrl: "",
    description: "",
    requirements: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.location || !formData.salary) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setIsSubmitting(true);
    const newJobObj = {
      ...formData,
      id: `J${Date.now()}`,
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
      postedAgo: "Just now",
      creatorName: "Creator Hub User",
      creatorBadge: "Verified Creator",
      requirements: formData.requirements
        ? formData.requirements.split("\n").filter((r) => r.trim() !== "")
        : ["Relevant degree for 2023-2026 batch candidates", "Strong domain skills"],
      views: 1,
      applicationsCount: 0
    };

    await onAddJob(newJobObj);
    setIsSubmitting(false);
    toast.success("Job listing posted & published live on JOBVEX Index!");
    setFormData({
      title: "",
      company: "",
      type: "fulltime",
      batch: "2023-2026 Batch",
      location: "",
      salary: "",
      applyUrl: "",
      description: "",
      requirements: ""
    });
  };

  return (
    <div className="creator-portal-container">
      {/* Creator Analytics Dashboard Header */}
      <div className="portal-header">
        <div className="creator-profile-card">
          <div className="creator-avatar">
            <ShieldCheck size={36} color="#6366f1" />
          </div>
          <div>
            <h2>Creator Hub Dashboard</h2>
            <p className="creator-subtitle">
              Verified Creator Network • <strong>JOBVEX Partner</strong>
            </p>
          </div>
        </div>

        <div className="analytics-metrics-grid">
          <div className="metric-card">
            <Briefcase size={20} className="metric-icon" />
            <div className="metric-info">
              <span className="metric-value">42</span>
              <span className="metric-label">Active Jobs Posted</span>
            </div>
          </div>
          <div className="metric-card">
            <Eye size={20} className="metric-icon" />
            <div className="metric-info">
              <span className="metric-value">128,400</span>
              <span className="metric-label">Total Student Views</span>
            </div>
          </div>
          <div className="metric-card">
            <DollarSign size={20} className="metric-icon" />
            <div className="metric-info">
              <span className="metric-value">₹48,500</span>
              <span className="metric-label">Curator Earnings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post New Job Form */}
      <div className="post-job-card">
        <div className="form-card-header">
          <PlusCircle size={22} color="#6366f1" />
          <div>
            <h3>Post a New Verified Job Opportunity</h3>
            <p>Curate off-campus hiring drives, internships, or WFH roles directly for student candidates.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-row duo">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Software Engineer / Data Analyst Intern"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Deloitte / Microsoft / Startup"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row trio">
            <div className="form-group">
              <label>Role Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="fulltime">Full Time</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
                <option value="wfh">Work From Home</option>
              </select>
            </div>
            <div className="form-group">
              <label>Batch Eligibility</label>
              <input
                type="text"
                name="batch"
                placeholder="e.g. 2023-2026 Batch"
                value={formData.batch}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Bengaluru / Remote (India)"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row duo">
            <div className="form-group">
              <label>Salary / Stipend *</label>
              <input
                type="text"
                name="salary"
                placeholder="e.g. ₹6.5 LPA or ₹25,000 / month"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Official Apply Link (URL)</label>
              <input
                type="url"
                name="applyUrl"
                placeholder="https://company.com/careers/job123"
                value={formData.applyUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Job Description Summary</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Provide a clear description of the role, responsibilities, and team culture..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Requirements (One per line)</label>
            <textarea
              name="requirements"
              rows={3}
              placeholder="B.Tech in CS/IT or equivalent&#10;Hands-on knowledge of Python & SQL&#10;Good communication skills"
              value={formData.requirements}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-post-btn" disabled={isSubmitting}>
            <Send size={18} />
            <span>{isSubmitting ? "Publishing Listing..." : "Publish Job to JOBVEX Index"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
