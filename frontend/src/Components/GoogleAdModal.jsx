import { useState, useEffect } from "react";
import { ExternalLink, X, Info, Sparkles } from "lucide-react";

const SAMPLE_ADS = [
  {
    sponsor: "Google Cloud Skills Boost",
    badge: "Sponsored • Google Ads",
    headline: "Build Your AI Skills with Official Google Cloud Certifications",
    tagline: "Get $300 free credits + access to 700+ hands-on labs in Generative AI, DevOps, and Data Engineering.",
    cta: "Claim Free Credits",
    url: "https://cloud.google.com",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&auto=format&fit=crop&q=80",
    themeColor: "#4285F4"
  },
  {
    sponsor: "Google Workspace & Gemini",
    badge: "Sponsored • Google Ads",
    headline: "Supercharge your productivity with Gemini for Workspace",
    tagline: "Draft emails, analyze spreadsheets, and summarize meetings in seconds with Google AI.",
    cta: "Start Free Trial",
    url: "https://workspace.google.com",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    themeColor: "#EA4335"
  },
  {
    sponsor: "Coursera Professional Certificates",
    badge: "Sponsored • Google Ads",
    headline: "Launch Your Career in Data Analytics & UX Design",
    tagline: "No degree or prior experience required. Over 85% of graduates report career impact within 6 months.",
    cta: "Enroll Today",
    url: "https://coursera.org",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    themeColor: "#FBBC04"
  }
];

export default function GoogleAdModal({ isOpen, onClose, onAdComplete }) {
  const [currentAdIndex] = useState(() => Math.floor(Math.random() * SAMPLE_ADS.length));
  const [countdown, setCountdown] = useState(3);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const ad = SAMPLE_ADS[currentAdIndex];

  const handleSkipOrClose = () => {
    if (canSkip || countdown === 0) {
      onAdComplete();
      onClose();
    }
  };

  const handleAdClick = () => {
    window.open(ad.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="google-ad-backdrop">
      <div className="google-ad-container">
        {/* Top Google Ads Header Bar */}
        <div className="google-ad-header">
          <div className="google-ad-brand">
            <span className="g-blue">G</span>
            <span className="g-red">o</span>
            <span className="g-yellow">o</span>
            <span className="g-blue">g</span>
            <span className="g-green">l</span>
            <span className="g-red">e</span>
            <span className="ad-label-tag">Ads</span>
            <span className="ad-info-icon" title="Ads by Google">
              <Info size={14} />
            </span>
          </div>

          <div className="google-ad-timer-box">
            {!canSkip ? (
              <span className="ad-countdown-text">
                Ad ending in <strong className="countdown-sec">{countdown}s</strong>
              </span>
            ) : (
              <button className="skip-ad-btn active" onClick={handleSkipOrClose}>
                Skip Ad <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Ad Main Content Banner */}
        <div className="google-ad-body" onClick={handleAdClick}>
          <div className="ad-image-wrapper">
            <img src={ad.image} alt={ad.sponsor} className="ad-cover-img" />
            <span className="ad-sponsored-pill">
              <Sparkles size={12} /> {ad.badge}
            </span>
          </div>

          <div className="ad-details">
            <div className="ad-sponsor-name">{ad.sponsor}</div>
            <h3 className="ad-headline">{ad.headline}</h3>
            <p className="ad-tagline">{ad.tagline}</p>

            <div className="ad-action-row">
              <button className="ad-cta-btn" style={{ backgroundColor: ad.themeColor }}>
                {ad.cta} <ExternalLink size={14} />
              </button>
              <span className="ad-domain-url">{new URL(ad.url).hostname}</span>
            </div>
          </div>
        </div>

        {/* Ad Progress Bar */}
        <div className="google-ad-progress-bar">
          <div
            className="progress-fill"
            style={{
              width: canSkip ? "100%" : `${((3 - countdown) / 3) * 100}%`,
              transition: "width 1s linear"
            }}
          ></div>
        </div>

        {/* Footer skip notification */}
        <div className="google-ad-footer">
          <span>Viewing advertisement before opening job details</span>
          {canSkip && (
            <button className="continue-link" onClick={handleSkipOrClose}>
              Continue to Job Details &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
