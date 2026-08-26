/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/triggers/leadgen.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/triggers/leadgen.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */

/**
 * Facebook Lead Ads's webhook trigger — the delivery contract.
 *
 * Kept beside the service descriptor rather than inside a node, because a
 * signature scheme is a fact about FACEBOOK LEAD ADS. Two Facebook Lead Ads
 * triggers must not be able to disagree about how a delivery is verified.
 */

import { verifyDelivery, type HmacScheme, type InboundDelivery, type TriggerDescriptor, type WebhookVerification } from "@particle-academy/fancy-connector-core";
import { facebookLeadAdsFaker } from "../faker.js";

export const FACEBOOK_LEAD_ADS_LEADGEN_SIGNATURE_HEADER = "X-Hub-Signature-256";

export const FACEBOOK_LEAD_ADS_LEADGEN_SCHEME: HmacScheme = {
  algorithm: "SHA-256",
  payload: (raw, timestamp) => raw,
  encoding: "hex",
};

/** Strip the `sha256=` prefix the provider sends. */
export function parseFacebookLeadAdsSignature(raw: string): { signature?: string } {
  return { signature: raw.startsWith("sha256=") ? raw.slice(7) : raw };
}

export const FACEBOOK_LEAD_ADS_LEADGEN: TriggerDescriptor = {
  service: "facebook_lead_ads",
  operation: "leadgen",
  delivery: "webhook",
  setup:
    "In the Meta app dashboard, add a Webhooks product, subscribe to the PAGE object and tick the `leadgen` field, and point the callback URL at the route your host mounts for this trigger. Meta first sends a GET carrying `hub.mode=subscribe`, `hub.verify_token` and `hub.challenge` -- the host must echo `hub.challenge` back as the body and check `hub.verify_token` against the value set in the dashboard, or the subscription is never activated. Then subscribe the app to each Page (`POST /{pageId}/subscribed_apps` with `subscribed_fields=leadgen`), which is a SEPARATE step: a webhook configured but not subscribed per Page delivers nothing and reports nothing.",
  verification: {
    signatureHeader: FACEBOOK_LEAD_ADS_LEADGEN_SIGNATURE_HEADER,
    scheme: FACEBOOK_LEAD_ADS_LEADGEN_SCHEME,
    parse: parseFacebookLeadAdsSignature,
  },
  faker: facebookLeadAdsFaker,
};

/**
 * Verify one inbound Facebook Lead Ads delivery.
 *
 * The host calls this BEFORE starting a run, with the body exactly as
 * received. Re-serialised JSON changes key order and whitespace, and produces
 * a mismatch that looks precisely like a wrong secret — hours of debugging the
 * wrong thing.
 *
 * The secret is the connection's `appSecret`.
 */
export function verifyFacebookLeadAdsDelivery(
  delivery: InboundDelivery,
  appSecret: string | undefined,
  now?: number,
): Promise<WebhookVerification> {
  return verifyDelivery(FACEBOOK_LEAD_ADS_LEADGEN, delivery, appSecret, now);
}
