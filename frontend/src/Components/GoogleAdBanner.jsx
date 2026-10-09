import { useEffect, useRef } from "react";

export default function GoogleAdBanner() {
  const adRef = useRef(null);
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const slotId = import.meta.env.VITE_ADSENSE_JOB_LIST_SLOT;
  const enabled = import.meta.env.VITE_ADSENSE_ENABLED === "true";

  useEffect(() => {
    if (!enabled || !clientId || !slotId || !adRef.current) return;

    if (adRef.current.dataset.adsenseRequested) return;

    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
    adRef.current.dataset.adsenseRequested = "true";
  }, [clientId, enabled, slotId]);

  if (!enabled || !clientId || !slotId) return null;

  return (
    <ins
      ref={adRef}
      className="adsbygoogle job-list-ad"
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
      aria-label="Advertisement"
    />
  );
}
