/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */

/**
 * Facebook Lead Ads's identity on the authoring surface, shared by every
 * Facebook Lead Ads node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * Facebook Lead Ads has no sandbox. Meta's Lead Ads Testing Tool creates a
 * test lead on the REAL form, which fires the real webhook and appears
 * alongside real leads until somebody deletes it. Anything this reads is real
 * customer data belonging to a real advertiser.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const FACEBOOK_LEAD_ADS_SERVICE = {
  service: "facebook_lead_ads",
  serviceTitle: "Facebook Lead Ads",
  domain: "marketing",
  sandbox: "none",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a Facebook Lead Ads connection holds. */
export const FACEBOOK_LEAD_ADS_CREDENTIALS = [
  {
    "key": "clientId",
    "label": "App ID",
    "scope": "provider",
    "secret": false,
    "help": "From the Meta app dashboard. ONE value for the whole installation."
  },
  {
    "key": "clientSecret",
    "label": "App secret (OAuth)",
    "scope": "provider",
    "secret": true,
    "help": "The same app's client secret, used to exchange the authorization code."
  },
  {
    "key": "appSecret",
    "label": "App secret (proof and webhook signature)",
    "scope": "provider",
    "secret": true,
    "help": "TWO roles, one value. It keys the appsecret_proof HMAC on outgoing calls, and it is also what Meta signs INCOMING webhook deliveries with -- there is no per-endpoint webhook secret in the Graph API the way there is in Stripe. It is never sent in either direction. For a standard Meta app this is the same value as the OAuth client secret; it is declared separately because they are different roles, and an app that rotates one without the other should not silently break the other."
  },
  {
    "key": "pageAccessToken",
    "label": "Page access token",
    "scope": "account",
    "secret": true,
    "help": "PER PAGE, not per user. Leads belong to a Page's forms, and Meta requires the token to be held by somebody who can advertise on the ad account. A long-lived page token lasts about 60 days and is re-authorised rather than refreshed."
  }
] as const;

/**
 * The OAuth2 exchange Facebook Lead Ads requires — DECLARED here, performed by
 * the host.
 *
 * A consent screen needs a browser, a redirect URI and somewhere to persist
 * the result, and all three belong to the host; a package that ran the dance
 * itself would have to own a web server. So this says precisely enough for a
 * host to do it.
 *
 * The access token lasts 5184000 seconds. A host that never refreshes will
 * work all afternoon and be broken by morning, which is why the lifetime is
 * stated rather than left to be discovered.
 *
 * Its refresh tokens do NOT rotate: the same one is reusable, so a refresh may
 * safely be retried and may run concurrently. That is stated rather than
 * assumed because the opposite — a provider that spends the token and revokes
 * the grant on a replay — looks identical until it happens.
 */
export const FACEBOOK_LEAD_ADS_OAUTH = {
  "flow": "authorization_code",
  "authorizeUrl": "https://www.facebook.com/v25.0/dialog/oauth",
  "tokenUrl": "https://graph.facebook.com/v25.0/oauth/access_token",
  "scopes": [
    "leads_retrieval",
    "pages_manage_ads",
    "pages_show_list",
    "pages_read_engagement",
    "pages_manage_metadata"
  ],
  "accessTokenCredential": "pageAccessToken",
  "refreshTokenCredential": null,
  "refreshTokenRotates": false,
  "accessTokenTtlSeconds": 5184000
} as const;

/** Build a Facebook Lead Ads node's connector metadata from the operation it performs. */
export function facebookLeadAdsMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...FACEBOOK_LEAD_ADS_SERVICE, role, operation, docs };
}
