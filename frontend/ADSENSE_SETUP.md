# AdSense Setup and Site Operations

## Project configuration

1. Confirm that `ca-pub-4328913150067523` is the publisher ID for the AdSense account that owns the production domain. The same ID is currently in `.env.example` and `public/ads.txt`; replace it in both locations if it is not yours.
2. Copy `.env.example` to `.env.local`. Set `VITE_ADSENSE_CLIENT_ID` to the account's publisher ID. After creating an in-page ad unit in AdSense, set `VITE_ADSENSE_JOB_LIST_SLOT` to its slot ID.
3. Keep `VITE_ADSENSE_ENABLED=false` until the production domain is added and marked **Ready** in AdSense, the privacy page has been reviewed, and any required consent message/CMP is configured. Set it to `true` to show the in-page unit. Rebuild and redeploy after environment changes.
4. Deploy the frontend to a public HTTPS domain. Confirm `https://YOUR_DOMAIN/ads.txt` returns the publisher line and `https://YOUR_DOMAIN/privacy-policy.html` is publicly reachable. The app loads the AdSense ownership script when the client ID is configured; actual ad requests additionally require the enabled flag and slot ID.
5. In AdSense, add the canonical production domain, verify ownership, then request review. Do not expect ads until the site is approved. The local Vite development origin is not a substitute for the production domain review.

## Account-side site management

These account operations cannot be performed by this frontend. Sign in to AdSense and use **Sites**; the Google help pages below describe each workflow.

- [AdSense site management](https://support.google.com/adsense/answer/12131223): add a domain before using it for AdSense, verify ownership, and meet program policies.
- [Add a new site](https://support.google.com/adsense/answer/12169212): add the production URL, use the AdSense code/ads.txt/meta-tag verification method, and request a review.
- [Check site status](https://support.google.com/adsense/answer/12170222): check approval and ads.txt statuses. Allow the review to finish; Google says it can take a few days or, in some cases, 2-4 weeks.
- [Site not ready](https://support.google.com/adsense/answer/12176698): check that the code is present, the public HTTPS site is reachable by the crawler, there is enough original content and useful navigation, and policy issues are resolved; then request another review.
- [Content and user experience](https://support.google.com/adsense/answer/10015918): maintain useful, original content, avoid duplicate/scraped content, and make navigation work across devices.
- [Remove a site](https://support.google.com/adsense/answer/12169215): remove it from the AdSense Sites page. This stops ads on that site; adding it again requires another check.
- [Platform partner sites](https://support.google.com/adsense/answer/12186829): inspect partner-controlled ad settings, ads.txt, policy and revenue-share properties in the site details. Only use partner-specific code/metadata when your platform partner provides it.
- [Inactive sites](https://support.google.com/adsense/answer/12171038): if AdSense marks the site inactive, restore ad serving and request review from the site's details when needed.

## Before requesting review

- Replace demo job/blog records and placeholder contact details with current, accurate information.
- Make sure job listings and editorial pages add original value, remain current, and link to the promised content. AdSense approval is decided by Google, not by this checklist.
- Review the privacy policy against the site's actual data handling, hosting, ad personalization, and consent setup. The included page is a starting point, not legal advice.
- If serving users in regions requiring consent, configure an applicable Google-certified CMP or Google's consent tools in AdSense before serving personalized ads.
- Verify desktop/mobile navigation, all footer destinations, HTTPS, crawler accessibility, and the root `ads.txt` after deployment.