import { useState } from "react";
import {
  ShieldCheck,
  PlusCircle,
  Briefcase,
  Eye,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Save,
  Lock,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPortal({
  jobs = [],
  onAddJob,
  onUpdateJob,
  onDeleteJob,
  setUserRole,
  isAdminAuthenticated,
  setIsAdminAuthenticated
}) {
  const [adminKey, setAdminKey] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    companyLogo: "",
    type: "fulltime",
    batch: "2023-2026 Batch",
    location: "",
    salary: "",
    applyUrl: "",
    description: "",
    requirements: ""
  });

  // Handle opening modal for creating new job
  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      company: "",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
      type: "fulltime",
      batch: "2023-2026 Batch",
      location: "",
      salary: "",
      applyUrl: "",
      description: "",
      requirements: ""
    });
    setIsModalOpen(true);
  };

  // Handle opening modal for editing an existing job
  const handleOpenEditModal = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || "",
      company: job.company || "",
      companyLogo: job.companyLogo || "",
      type: job.type || "fulltime",
      batch: job.batch || "2023-2026 Batch",
      location: job.location || "",
      salary: job.salary || "",
      applyUrl: job.applyUrl || "",
      description: job.description || "",
      requirements: job.requirements ? job.requirements.join("\n") : ""
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.location || !formData.salary) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const processedJobData = {
      ...formData,
      companyLogo: formData.companyLogo || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
      requirements: formData.requirements
        ? formData.requirements.split("\n").filter((r) => r.trim() !== "")
        : ["Degree in relevant discipline for 2023-2026 batch", "Strong communication and technical skills"]
    };

    if (editingJob) {
      // Update existing job
      await onUpdateJob(editingJob.id, {
        ...editingJob,
        ...processedJobData
      });
      toast.success(`Successfully updated job: ${formData.title}`);
    } else {
      // Create new job
      const newJobObj = {
        ...processedJobData,
        id: `J${Date.now()}`,
        postedAgo: "Just now",
        creatorName: "JOBVEX Admin",
        creatorBadge: "Verified Admin",
        views: 1,
        applicationsCount: 0
      };
      await onAddJob(newJobObj);
      toast.success(`Successfully posted job: ${formData.title}`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteClick = (job) => {
    if (window.confirm(`Are you sure you want to delete "${job.title}" at ${job.company}?`)) {
      onDeleteJob(job.id);
      toast.success(`Deleted job: ${job.title}`);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (adminKey.trim() === "SmS@210709") {
      setIsAdminAuthenticated(true);
      toast.success("Admin Authentication Verified! Welcome Admin.");
    } else if (adminKey.trim().length > 0) {
      toast.error("Invalid Admin Key!");
    } else {
      toast.error("Please enter the Admin Key!");
    }
  };

  // Filter jobs for Admin Table
  const filteredAdminJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalViews = jobs.reduce((sum, j) => sum + (j.views || 0), 0);
  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicationsCount || 0), 0);

  if (!isAdminAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="login-icon">
            <Lock size={32} color="#6366f1" />
          </div>
          <h2>JOBVEX Admin Portal</h2>
          <p>Restricted access. Regular users cannot view Admin pages. Enter Admin Key to access.</p>
          <form onSubmit={handleLoginSubmit} className="login-form">
            <input
              type="password"
              placeholder="Enter Admin Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="admin-pass-input"
              autoFocus
            />
            <button type="submit" className="login-btn">
              Authenticate & Enter Admin Panel
            </button>
            <button
              type="button"
              className="cancel-login-btn"
              onClick={() => setUserRole("user")}
              style={{
                marginTop: "10px",
                background: "transparent",
                border: "1px solid #cbd5e1",
                color: "#64748b",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Cancel & Return to User View
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-container">
      {/* Admin Header Banner */}
      <div className="admin-banner">
        <div className="admin-profile-info">
          <div className="admin-avatar">
            <ShieldCheck size={32} color="#6366f1" />
          </div>
          <div>
            <div className="admin-role-badge">
              <CheckCircle2 size={12} color="#10b981" /> Verified Platform Administrator
            </div>
            <h1>JOBVEX Admin Management Dashboard</h1>
            <p>Manage job listings, monitor candidate analytics, and curate off-campus hiring drives.</p>
          </div>
        </div>

        <div className="admin-banner-actions">
          <button className="create-job-btn" onClick={handleOpenCreateModal}>
            <PlusCircle size={18} /> Post New Job Listing
          </button>
          <button
            className="switch-user-btn"
            onClick={() => {
              setIsAdminAuthenticated(false);
              setUserRole("user");
            }}
            title="Switch view to User Portal"
          >
            <LogOut size={16} /> Exit to User Portal
          </button>
        </div>
      </div>

      {/* Overview Analytics Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper bg-indigo">
            <Briefcase size={22} color="#6366f1" />
          </div>
          <div className="stat-details">
            <span className="stat-value">{jobs.length}</span>
            <span className="stat-label">Active Job Listings</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper bg-emerald">
            <Eye size={22} color="#10b981" />
          </div>
          <div className="stat-details">
            <span className="stat-value">{totalViews.toLocaleString()}</span>
            <span className="stat-label">Total Candidate Views</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper bg-pink">
            <Users size={22} color="#ec4899" />
          </div>
          <div className="stat-details">
            <span className="stat-value">{totalApplicants.toLocaleString()}</span>
            <span className="stat-label">Applications Redirected</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper bg-amber">
            <DollarSign size={22} color="#f59e0b" />
          </div>
          <div className="stat-details">
            <span className="stat-value">₹1,48,500</span>
            <span className="stat-label">Platform Revenue</span>
          </div>
        </div>
      </div>

      {/* Admin Jobs Management Section */}
      <div className="admin-table-section">
        <div className="table-header-row">
          <div>
            <h2>Manage Job Listings ({filteredAdminJobs.length})</h2>
            <p>Create, update, or remove jobs visible on the candidate job index.</p>
          </div>

          <div className="admin-search-box">
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by title, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Jobs Data Table */}
        <div className="table-responsive">
          <table className="admin-jobs-table">
            <thead>
              <tr>
                <th>Company & Job Title</th>
                <th>Role Type</th>
                <th>Batch</th>
                <th>Location</th>
                <th>Salary / Stipend</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdminJobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="table-job-cell">
                      <img
                        src={job.companyLogo || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80"}
                        alt={job.company}
                        className="table-company-logo"
                      />
                      <div>
                        <strong className="table-job-title">{job.title}</strong>
                        <div className="table-company-name">{job.company}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="table-type-badge capitalize">{job.type}</span>
                  </td>
                  <td>{job.batch || "2023-2026 Batch"}</td>
                  <td>{job.location}</td>
                  <td><span className="salary-highlight">{job.salary}</span></td>
                  <td>{job.views || 0}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleOpenEditModal(job)}
                        title="Edit Job"
                      >
                        <Edit size={15} /> Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteClick(job)}
                        title="Delete Job"
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Post / Edit Job */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-company-info">
                <h2>{editingJob ? "Edit Job Listing" : "Post New Verified Job"}</h2>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="admin-form-body">
              <div className="form-row duo">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Software Engineer Trainee"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Deloitte / Wipro / Microsoft"
                    value={formData.company}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row trio">
                <div className="form-group">
                  <label>Role Type</label>
                  <select name="type" value={formData.type} onChange={handleFormChange}>
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
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Bengaluru / Remote"
                    value={formData.location}
                    onChange={handleFormChange}
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
                    placeholder="e.g. ₹7.5 LPA or ₹30,000 / month"
                    value={formData.salary}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Official Apply URL</label>
                  <input
                    type="url"
                    name="applyUrl"
                    placeholder="https://company.com/careers/job-123"
                    value={formData.applyUrl}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Job Overview / Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Detailed description of role responsibilities..."
                  value={formData.description}
                  onChange={handleFormChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Requirements & Qualifications (One per line)</label>
                <textarea
                  name="requirements"
                  rows={3}
                  placeholder="B.Tech/B.E in CS/IT&#10;Proficiency in Java / React&#10;Strong problem solving skills"
                  value={formData.requirements}
                  onChange={handleFormChange}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="secondary-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-apply-btn">
                  <Save size={16} /> {editingJob ? "Save Changes" : "Publish Job Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
