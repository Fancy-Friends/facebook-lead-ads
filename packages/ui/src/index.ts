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
 * Facebook Lead Ads's node kinds for fancy-flow.
 *
 * Install this on every host. The TypeScript executors live in the js
 * package's `./flow` subpath; PHP and Python hosts run their own and need only
 * this.
 */

export * from "./service.js";
export * from "./kinds/lead-get.js";
export * from "./kinds/leadgen.js";

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { facebookLeadAdsLeadKind } from "./kinds/lead-get.js";
import { facebookLeadAdsWebhookTriggerKind } from "./kinds/leadgen.js";

/** Every Facebook Lead Ads kind, for a host that registers the lot. */
export const FACEBOOK_LEAD_ADS_KINDS: NodeKindDefinition[] = [
  facebookLeadAdsLeadKind,
  facebookLeadAdsWebhookTriggerKind,
];
