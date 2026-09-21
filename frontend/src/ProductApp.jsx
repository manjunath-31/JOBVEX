import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import JobCard from "./Components/JobCard";
import JobDetailModal from "./Components/JobDetailModal";
import TalkZone from "./Components/TalkZone";
import CreatorPortal from "./Components/CreatorPortal";
import AdminPortal from "./Components/AdminPortal";
import BlogSection from "./Components/BlogSection";
import AboutContact from "./Components/AboutContact";
import Footer from "./Components/Footer";
import GoogleAdModal from "./Components/GoogleAdModal";
import GoogleAdBanner from "./Components/GoogleAdBanner";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000";

const INITIAL_JOBS = [
  {
    id: "J101",
    title: "Service Associate - Global Data Management",
    company: "Deloitte",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
    type: "fulltime",
    batch: "2023-2026 Batch",
    location: "Hyderabad / Bengaluru",
    salary: "₹6.5 - ₹8.5 LPA",
    postedAgo: "2 hours ago",
    description: "Deloitte is one of the world's leading professional services firms. As a Service Associate in Global Data Management, you will perform data validation, ensure compliance with data governance standards, and collaborate with international client teams.",
    requirements: [
      "Bachelor's degree in CS, IT, Business, or related fields (2023-2026 graduates)",
      "Strong analytical skills and attention to detail",
      "Proficiency in Excel, SQL, or Python data validation tools"
    ],
    applyUrl: "https://usijobs.deloitte.com",
    creatorName: "TechCareers India",
    creatorBadge: "Top Creator",
    views: 1420,
    applicationsCount: 289
  },
  {
    id: "J102",
    title: "Data Analyst Intern",
    company: "Portcast",
    companyLogo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=80",
    type: "internship",
    batch: "2025-2026 Batch",
    location: "Remote (India)",
    salary: "₹25,000 / month Stipend",
    postedAgo: "5 hours ago",
    description: "Portcast is a venture-backed logistics technology startup headquartered in Singapore. We are seeking a Data Analyst Intern to build real-time logistics analytics dashboards and evaluate ML models.",
    requirements: [
      "Currently pursuing B.Tech/B.E in CS or Statistics",
      "Hands-on experience with SQL, Pandas, and Tableau/PowerBI"
    ],
    applyUrl: "https://portcast.io/careers",
    creatorName: "DataJobsX",
    creatorBadge: "Verified Creator",
    views: 980,
    applicationsCount: 164
  },
  {
    id: "J103",
    title: "QA Engineer (Freshers)",
    company: "Micro1.ai",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    type: "remote",
    batch: "2024-2026 Batch",
    location: "Remote (India)",
    salary: "₹8.0 - ₹10.0 LPA",
    postedAgo: "1 day ago",
    description: "Micro1 is an emerging AI-focused data platform that partners with global technology firms. You will participate in automated API testing, regression test suites, and AI model quality assurance.",
    requirements: [
      "B.Tech in CS/IT or equivalent degree",
      "Understanding of STLC & Selenium/Cypress basics"
    ],
    applyUrl: "https://micro1.ai/careers",
    creatorName: "FreshersHub",
    creatorBadge: "Top Creator",
    views: 2150,
    applicationsCount: 412
  },
  {
    id: "J104",
    title: "Graduate Engineer Trainee (GET)",
    company: "Wipro",
    companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80",
    type: "fulltime",
    batch: "2024-2025 Batch",
    location: "Pan India Locations",
    salary: "₹4.5 - ₹6.0 LPA",
    postedAgo: "1 day ago",
    description: "Wipro Limited has launched its National Qualifier Test for GET roles across Cloud, Full Stack Engineering, DevOps, and Cybersecurity practices.",
    requirements: [
      "B.E/B.Tech/M.E/M.Tech/MCA/M.Sc with 60% CGPA throughout academics",
      "Basic coding proficiency in C++, Java, or Python"
    ],
    applyUrl: "https://careers.wipro.com",
    creatorName: "CampusPlacementOfficial",
    creatorBadge: "Verified Creator",
    views: 4320,
    applicationsCount: 980
  },
  {
    id: "J105",
    title: "Software Engineer / Product Role",
    company: "ProArch",
    companyLogo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&auto=format&fit=crop&q=80",
    type: "wfh",
    batch: "2023-2026 Batch",
    location: "Work From Home",
    salary: "₹7.0 - ₹9.5 LPA",
    postedAgo: "2 days ago",
    description: "ProArch is a globally recognized software development and consultancy firm. We are hiring Software Engineer trainees who have a flair for React/Node.js web stack.",
    requirements: [
      "Proficiency in modern JavaScript, HTML5, CSS3, and React.js",
      "Familiarity with REST APIs and Git"
    ],
    applyUrl: "https://proarch.com/careers",
    creatorName: "CodeDrive",
    creatorBadge: "Verified Creator",
    views: 1840,
    applicationsCount: 310
  },
  {
    id: "J106",
    title: "Associate Product Designer",
    company: "Microsoft",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    type: "fulltime",
    batch: "2024-2026 Batch",
    location: "Hyderabad / Noida",
    salary: "₹16.0 - ₹22.0 LPA",
    postedAgo: "2 days ago",
    description: "Microsoft is seeking Associate Product Designers to join our India Development Center (IDC). You will craft intuitive user interfaces for enterprise productivity tools.",
    requirements: [
      "Bachelor's or Master's degree in Design, HCI, or CS",
      "Proficiency in Figma, user prototyping, and wireframing"
    ],
    applyUrl: "https://careers.microsoft.com",
    creatorName: "DesignHub",
    creatorBadge: "Top Creator",
    views: 5600,
    applicationsCount: 1120
  }
];

const INITIAL_BLOGS = [
  {
    id: "B1",
    title: "Top 10 Technical Questions Asked in Off-Campus Fresher Interviews (2026)",
    category: "Interview Prep",
    readTime: "5 min read",
    date: "Sep 10, 2026",
    snippet: "A comprehensive guide covering DSA patterns, SQL joins, System Design basics, and OOP concepts frequently tested by product companies."
  },
  {
    id: "B2",
    title: "How to Build an ATS-Friendly Resume for 2026 Campus Drives",
    category: "Resume Tips",
    readTime: "4 min read",
    date: "Sep 08, 2026",
    snippet: "Learn action verbs, keyword optimization, project descriptions, and structural formatting to beat applicant tracking systems automatically."
  },
  {
    id: "B3",
    title: "Mastering English Communication for Tech Interviews via VoiceRooms",
    category: "Communication",
    readTime: "6 min read",
    date: "Sep 05, 2026",
    snippet: "Why conversational practice beats silent reading when preparing for HR and managerial rounds."
  }
];

export default function ProductApp() {
  const [userRole, setUserRole] = useState("user"); // "user" or "admin"
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedJobModal, setSelectedJobModal] = useState(null);

  // Google Ads State
  const [pendingJobSelection, setPendingJobSelection] = useState(null);
  const [showAdModal, setShowAdModal] = useState(false);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`);
      if (response.data && response.data.length > 0) {
        setJobs(response.data);
      } else {
        setJobs(INITIAL_JOBS);
      }
    } catch {
      setJobs(INITIAL_JOBS);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      if (response.data && response.data.length > 0) {
        setBlogs(response.data);
      } else {
        setBlogs(INITIAL_BLOGS);
      }
    } catch {
      setBlogs(INITIAL_BLOGS);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(() => {
      fetchJobs();
      fetchBlogs();
    });
  }, []);

  // Add Job (Admin or Creator)
  const handleAddJob = async (newJobObj) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs`, newJobObj);
      setJobs([response.data, ...jobs]);
    } catch {
      setJobs([newJobObj, ...jobs]);
    }
  };

  // Update Job (Admin Edit)
  const handleUpdateJob = async (id, updatedJobObj) => {
    try {
      await axios.put(`${API_BASE_URL}/jobs/${id}`, updatedJobObj);
    } catch {
      console.log("Updated locally");
    }
    setJobs(jobs.map((j) => (j.id === id ? updatedJobObj : j)));
  };

  // Delete Job (Admin Delete)
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/jobs/${id}`);
    } catch {
      console.log("Deleted locally");
    }
    setJobs(jobs.filter((j) => j.id !== id));
  };

  // Job selection with Google Ads playback trigger
  const handleSelectJobWithAd = (job) => {
    // Play Google Interstitial Ad before opening job details modal
    setPendingJobSelection(job);
    setShowAdModal(true);
  };

  const handleAdComplete = () => {
    if (pendingJobSelection) {
      // Increment views
      const updated = {
        ...pendingJobSelection,
        views: (pendingJobSelection.views || 0) + 1
      };
      setSelectedJobModal(updated);
    }
    setPendingJobSelection(null);
  };

  const handleJobApplyClick = (job) => {
    // Increase application count
    const updatedJobs = jobs.map((j) =>
      j.id === job.id ? { ...j, applicationsCount: (j.applicationsCount || 0) + 1 } : j
    );
    setJobs(updatedJobs);
  };

  // Filter jobs for User View
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" ||
      job.type.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="jobvex-app">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        isAdminAuthenticated={isAdminAuthenticated}
        onLogoutAdmin={() => {
          setIsAdminAuthenticated(false);
          setUserRole("user");
          toast.success("Logged out from Admin");
        }}
      />

      {/* Main View Router */}
      <main className="main-layout">
        {userRole === "admin" ? (
          /* Dedicated Admin Portal View */
          <AdminPortal
            jobs={jobs}
            onAddJob={handleAddJob}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
            userRole={userRole}
            setUserRole={setUserRole}
            isAdminAuthenticated={isAdminAuthenticated}
            setIsAdminAuthenticated={setIsAdminAuthenticated}
          />
        ) : (
          /* Dedicated User (Job Seeker) Portal View */
          <>
            {activeTab === "jobs" && (
              <>
                <Hero
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  activeJobsCount={filteredJobs.length}
                  onOpenVoiceRoom={() => setActiveTab("voiceroom")}
                />

                <section className="jobs-container">
                  {filteredJobs.length > 0 ? (
                    <div className="jobs-grid">
                      {filteredJobs.map((job, idx) => (
                        <React.Fragment key={job.id}>
                          <JobCard
                            job={job}
                            onSelectJob={handleSelectJobWithAd}
                          />
                          {/* Inject Google Ad Banner between job listings */}
                          {idx === 1 && <GoogleAdBanner />}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="no-jobs-found">
                      <Search size={40} color="#94a3b8" />
                      <h3>No jobs match your search criteria</h3>
                      <p>Try adjusting your search terms or selecting 'All Jobs'.</p>
                      <button
                        className="filter-pill active"
                        style={{ marginTop: "16px" }}
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedType("all");
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </section>
              </>
            )}

            {activeTab === "voiceroom" && <TalkZone />}
            {activeTab === "creator" && <CreatorPortal onAddJob={handleAddJob} />}
            {activeTab === "blog" && <BlogSection blogs={blogs} />}
            {(activeTab === "about" || activeTab === "contact") && (
              <AboutContact key={activeTab} mode={activeTab} />
            )}
          </>
        )}
      </main>

      {/* Google Interstitial Ad Modal */}
      <GoogleAdModal
        key={showAdModal ? "open" : "closed"}
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onAdComplete={handleAdComplete}
      />

      {/* Job Details Modal for Candidates */}
      <JobDetailModal
        job={selectedJobModal}
        onClose={() => setSelectedJobModal(null)}
        onApply={handleJobApplyClick}
      />

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
