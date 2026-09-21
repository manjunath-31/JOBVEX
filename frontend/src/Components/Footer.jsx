import { Briefcase, Heart } from "lucide-react";

export default function Footer({ setActiveTab }) {
  return (
    <footer className="jobvex-footer">
      <div className="footer-container">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="brand-logo" onClick={() => setActiveTab("jobs")}>
            <div className="logo-icon">
              <Briefcase size={20} className="logo-svg" />
            </div>
            <div className="brand-name">JOBVEX</div>
          </div>
          <p className="footer-tagline">
            India's most trusted job index for freshers. 1,000+ creators. Thousands of verified off-campus job & internship listings updated daily.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h4>Quick Navigation</h4>
          <ul>
            <li onClick={() => setActiveTab("jobs")}>Latest Fresher Jobs</li>
            <li onClick={() => setActiveTab("jobs")}>Internships with Stipend</li>
            <li onClick={() => setActiveTab("jobs")}>Work From Home & Remote</li>
            <li onClick={() => setActiveTab("voiceroom")}>VoiceRoom Talk Zone</li>
            <li onClick={() => setActiveTab("blog")}>Interview Prep Blog</li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-links-col">
          <h4>Company & Support</h4>
          <ul>
            <li onClick={() => setActiveTab("about")}>About JOBVEX</li>
            <li onClick={() => setActiveTab("contact")}>Contact Support</li>
            <li onClick={() => setActiveTab("about")}>FAQ & Safety Tips</li>
            <li onClick={() => setActiveTab("creator")}>Become a Creator</li>
          </ul>
        </div>

        {/* Legal Disclaimer */}
        <div className="footer-links-col">
          <h4>Legal & Safety</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Community Guidelines</li>
            <li>Recruiter Verification</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 JOBVEX. All rights reserved. Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> for freshers across India.</p>
        <p className="legal-disclaimer">
          Job opportunities on JOBVEX are curated and verified by our creator network. We do not guarantee employment. Always verify details on the official company website before applying.
        </p>
      </div>
    </footer>
  );
}
