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
 * Facebook Lead Ads, as one service descriptor shared by every Facebook Lead
 * Ads operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Facebook Lead Ads: its base URL,
 * its auth scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Facebook Lead Ads has no sandbox. Meta's Lead Ads Testing Tool creates a
 * test lead on the REAL form, which fires the real webhook and appears
 * alongside real leads until somebody deletes it. Anything this reads is real
 * customer data belonging to a real advertiser.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { facebookLeadAdsFaker } from "./faker.js";
import { createHmac } from "node:crypto";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const FACEBOOK_LEAD_ADS_BASE_URLS = {
  "live": "https://graph.facebook.com/v25.0"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const FACEBOOK_LEAD_ADS_REQUIRES = [
  "pageAccessToken",
  "appSecret",
  "clientId",
  "clientSecret"
] as const;

/**
 * Apply Facebook Lead Ads's auth scheme to an outgoing request.
 *
 * Same as facebook-pages: Meta takes the token as a QUERY PARAMETER, and
 * appsecret_proof has to go in the query regardless, so both live in one place
 * and a request stays readable in a log.
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function facebookLeadAdsAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  const url = new URL(request.url);

  url.searchParams.set("access_token", String(credentials.pageAccessToken ?? ""));

  const proof = createHmac("sha256", String(credentials.appSecret ?? ""))
    .update(String(credentials.pageAccessToken ?? ""))
    .digest("hex");

  url.searchParams.set("appsecret_proof", proof);
  request.url = url.toString();
}

/** The Facebook Lead Ads service, for the TypeScript runtime. */
export const FACEBOOK_LEAD_ADS: ServiceDescriptor = {
  service: "facebook_lead_ads",
  title: "Facebook Lead Ads",
  sandbox: "none",
  baseUrls: { ...FACEBOOK_LEAD_ADS_BASE_URLS },
  requires: [...FACEBOOK_LEAD_ADS_REQUIRES],
  authorize: facebookLeadAdsAuthorize,
  faker: facebookLeadAdsFaker,
};
