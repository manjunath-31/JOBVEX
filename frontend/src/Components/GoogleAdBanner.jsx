import { ExternalLink, Info, Sparkles } from "lucide-react";

export default function GoogleAdBanner() {
  const ad = {
    sponsor: "Google Career Certificates",
    headline: "Accelerate your tech career with Google Credentials",
    tagline: "Learn Python, Cyber Security, Cloud, or Project Management at your own pace. 100% online.",
    cta: "Explore Courses",
    url: "https://grow.google/certificates",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80"
  };

  return (
    <div className="google-ad-banner-card" onClick={() => window.open(ad.url, "_blank")}>
      <div className="banner-ad-tag">
        <span>Ads by Google</span>
        <Info size={13} />
      </div>

      <div className="banner-content">
        <img src={ad.image} alt={ad.sponsor} className="banner-ad-img" />
        <div className="banner-text">
          <div className="banner-sponsor">
            <Sparkles size={13} color="#4285F4" /> {ad.sponsor}
          </div>
          <h4 className="banner-headline">{ad.headline}</h4>
          <p className="banner-tagline">{ad.tagline}</p>
        </div>
        <button className="banner-cta-btn">
          {ad.cta} <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
