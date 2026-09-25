import { useState } from "react";
import {
  Info,
  Mail,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Send,
  PhoneCall,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AboutContact({ mode = "about" }) {
  const [activeTab, setActiveTab] = useState(mode);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs = [
    {
      q: "What is JOBVEX and how is it different from general job portals?",
      a: "JOBVEX is India's dedicated job index built exclusively for freshers from the 2023, 2024, 2025, and 2026 batches. Unlike cluttered job portals, every opportunity listed on JOBVEX is curated and verified by our active network of creators before going live.",
    },
    {
      q: "Is JOBVEX completely free for job seekers?",
      a: "Yes. Searching jobs, applying directly through official corporate career pages, and participating in VoiceRoom talk zones are free for job seekers.",
    },
    {
      q: "How does the VoiceRoom Talk Zone work?",
      a: "VoiceRoom lets you connect anonymously with peer job candidates through live audio. You can practice technical interview questions, improve spoken English confidence, and exchange placement tips.",
    },
    {
      q: "How can I post jobs as a Creator?",
      a: "Click Join as Creator in the top navigation. After verification, you can access the Creator Dashboard to publish verified hiring drives and earn community rewards.",
    },
  ];

  const updateFormField = (field, value) => {
    setContactForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    toast.success(
      "Thank you for contacting JOBVEX Support! We will reply within 24 hours."
    );

    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="about-contact-container">
      <div
        className="sub-nav-tabs"
        role="tablist"
        aria-label="About JOBVEX navigation"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "about"}
          className={`sub-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          <Info size={16} />
          About JOBVEX
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "faq"}
          className={`sub-tab ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          <HelpCircle size={16} />
          FAQ & Safety Tips
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "contact"}
          className={`sub-tab ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          <Mail size={16} />
          Contact Support
        </button>
      </div>

      {activeTab === "about" && (
        <section className="info-card">
          <h1>
            About <span className="gradient-text">JOBVEX</span>
          </h1>

          <p className="lead-text">
            JOBVEX is India&apos;s premier job index designed to bridge the gap
            between fresh college graduates and verified off-campus career
            opportunities.
          </p>

          <div className="mission-grid">
            <article className="mission-card">
              <CheckCircle2 size={24} color="#10b981" />
              <h3>100% Verified Listings</h3>
              <p>
                Every job is reviewed against official corporate-domain listings
                to reduce spam and fake job offers.
              </p>
            </article>

            <article className="mission-card">
              <ShieldCheck size={24} color="#6366f1" />
              <h3>Creator Curation Network</h3>
              <p>
                Domain experts, HR professionals, and tech leads curate
                off-campus hiring drives daily.
              </p>
            </article>

            <article className="mission-card">
              <HelpCircle size={24} color="#ec4899" />
              <h3>VoiceRoom Confidence</h3>
              <p>
                Use anonymous audio rooms to practice mock technical and HR
                interviews before attending real corporate hiring drives.
              </p>
            </article>
          </div>
        </section>
      )}

      {activeTab === "faq" && (
        <section className="info-card">
          <h1>Frequently Asked Questions & Candidate Safety</h1>

          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.q} className="faq-item">
                <h3 className="faq-question">❓ {faq.q}</h3>
                <p className="faq-answer">{faq.a}</p>
              </article>
            ))}
          </div>

          <div className="safety-box">
            <ShieldCheck size={24} color="#10b981" />

            <div>
              <h3>Candidate Safety & Scam Protection Notice</h3>
              <p>
                JOBVEX will never ask job seekers for money in exchange for
                job placements or interview calls. Verify recruiter email
                addresses and apply only through official corporate career
                portals.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeTab === "contact" && (
        <section className="contact-wrapper">
          <div className="contact-info-panel">
            <h2>Get in Touch with Support</h2>

            <p>
              Have questions about job listings, creator partnerships, or
              VoiceRooms? Reach out to our team.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <Mail size={18} />
                <span>smsgroups3in1@gmail.com</span>
              </div>

              <div className="contact-item">
                <PhoneCall size={18} />
                <span>+91 8147927837 — Monday to Friday</span>
              </div>

              <div className="contact-item">
                <MapPin size={18} />
                <span>BTM ,2nd Stage Bengaluru, Karnataka</span>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Your Full Name</label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Manju Simha"
                  value={contactForm.name}
                  onChange={(event) =>
                    updateFormField("name", event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="manju@example.com"
                  value={contactForm.email}
                  onChange={(event) =>
                    updateFormField("email", event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>

                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Inquiry regarding Creator Partnership"
                  value={contactForm.subject}
                  onChange={(event) =>
                    updateFormField("subject", event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>

                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Type your message here..."
                  value={contactForm.message}
                  onChange={(event) =>
                    updateFormField("message", event.target.value)
                  }
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                <Send size={16} />
                Send Message to JOBVEX Support
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}
