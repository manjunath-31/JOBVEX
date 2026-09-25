import { Briefcase, Heart, MessageCircle } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/jobvexia/",
    Icon: () => <span className="social-text-icon">◎</span>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/143917430/",
    Icon: () => <span className="social-text-icon">in</span>,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Haav4nY1y/",
    Icon: () => <span className="social-text-icon">f</span>,
  },
  {
    label: "WhatsApp Channel",
    href: "https://www.whatsapp.com/channel/0029VbDcfgvH5JLv7eSNwD23",
    Icon: MessageCircle,
  },
];

export default function Footer({ setActiveTab }) {
  return (
    <footer className="jobvex-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div
            className="brand-logo"
            onClick={() => setActiveTab("jobs")}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveTab("jobs");
              }
            }}
          >
            <div className="logo-icon">
              <Briefcase size={20} className="logo-svg" />
            </div>

            <div className="brand-name">JOBVEX</div>
          </div>

          <p className="footer-tagline">
            India&apos;s most trusted job index for freshers. 1,000+ creators.
            Thousands of verified off-campus job &amp; internship listings
            updated daily.
          </p>

          <div className="footer-social" aria-label="JOBVEX social channels">
            <span>Follow JOBVEX</span>

            <div className="social-links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  className="social-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`JOBVEX on ${label}`}
                  title={label}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Quick Navigation</h4>
          <ul>
            <li onClick={() => setActiveTab("jobs")}>
              Latest Fresher Jobs
            </li>
            <li onClick={() => setActiveTab("jobs")}>
              Internships with Stipend
            </li>
            <li onClick={() => setActiveTab("jobs")}>
              Work From Home &amp; Remote
            </li>
            <li onClick={() => setActiveTab("voiceroom")}>
              VoiceRoom Talk Zone
            </li>
            <li onClick={() => setActiveTab("blog")}>
              Interview Prep Blog
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Company &amp; Support</h4>
          <ul>
            <li onClick={() => setActiveTab("about")}>About JOBVEX</li>
            <li onClick={() => setActiveTab("contact")}>Contact Support</li>
            <li onClick={() => setActiveTab("about")}>
              FAQ &amp; Safety Tips
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Legal &amp; Safety</h4>
          <ul>
            <li>Terms &amp; Conditions</li>
            <li>Privacy Policy</li>
            <li>Community Guidelines</li>
            <li>Recruiter Verification</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 JOBVEX. All rights reserved. Built with{" "}
          <Heart
            size={14}
            color="#ef4444"
            fill="#ef4444"
            aria-hidden="true"
          />{" "}
          for freshers across India.
        </p>

        <p className="legal-disclaimer">
          Job opportunities on JOBVEX are curated and verified by our creator
          network. We do not guarantee employment. Always verify details on the
          official company website before applying.
        </p>
      </div>
    </footer>
  );
}
