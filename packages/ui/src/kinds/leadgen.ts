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
 * Facebook lead — Start when somebody submits a Facebook lead form. The
 * delivery carries only IDS -- pair this with the `lead_get` action to read
 * the answers.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-leadgen/
 *
 * Delivery: webhook. In the Meta app dashboard, add a Webhooks product,
 * subscribe to the PAGE object and tick the `leadgen` field, and point the
 * callback URL at the route your host mounts for this trigger. Meta first
 * sends a GET carrying `hub.mode=subscribe`, `hub.verify_token` and
 * `hub.challenge` -- the host must echo `hub.challenge` back as the body and
 * check `hub.verify_token` against the value set in the dashboard, or the
 * subscription is never activated. Then subscribe the app to each Page (`POST
 * /{pageId}/subscribed_apps` with `subscribed_fields=leadgen`), which is a
 * SEPARATE step: a webhook configured but not subscribed per Page delivers
 * nothing and reports nothing.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { facebookLeadAdsMeta } from "../service.js";

export const FACEBOOK_LEAD_ADS_WEBHOOK_TRIGGER_KIND = "@particle-academy/facebook_lead_ads_webhook_trigger";
export const FACEBOOK_LEAD_ADS_WEBHOOK_TRIGGER_OPERATION = "leadgen";

export const FACEBOOK_LEAD_ADS_WEBHOOK_TRIGGER_META = facebookLeadAdsMeta("trigger", "a new lead", "https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-leadgen/");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const FACEBOOK_LEAD_ADS_WEBHOOK_TRIGGER_OUTPUT: OutputField[] = [
  {
    "path": "leadgen_id",
    "type": "string",
    "description": "The lead's id, and the ONLY way to reach the answers -- pass it to `lead_get`. Meta redelivers on failure, and there is no timestamp in the signature, so dedupe on this."
  },
  {
    "path": "page_id",
    "type": "string",
    "description": "The Page the form belongs to."
  },
  {
    "path": "form_id",
    "type": "string",
    "description": "Which lead form was submitted. Branch on this when one Page runs several."
  },
  {
    "path": "ad_id",
    "type": "string",
    "description": "The ad that produced the lead. Absent for an organic form submission."
  },
  {
    "path": "adgroup_id",
    "type": "string",
    "description": "The ad set. Meta still calls it adgroup on this payload."
  },
  {
    "path": "created_time",
    "type": "number",
    "description": "Unix seconds. When the person submitted, not when the delivery arrived."
  }
];

export const facebookLeadAdsWebhookTriggerKind: NodeKindDefinition = defineConnectorKind(FACEBOOK_LEAD_ADS_WEBHOOK_TRIGGER_META, {
  name: FACEBOOK_LEAD_ADS_WEBHOOK_TRIGGER_KIND,
  aliases: ["facebook_lead_ads_webhook_trigger"],
  label: "Facebook lead",
  description: "Start when somebody submits a Facebook lead form. The delivery carries only IDS -- pair this with the `lead_get` action to read the answers.",
  icon: "◆",
  inputs: [],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: FACEBOOK_LEAD_ADS_WEBHOOK_TRIGGER_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "formIds",
      "label": "Form IDs",
      "placeholder": "1234567890, 9876543210",
      "description": "Comma separated. Leave blank to accept every form on every subscribed Page. A delivery whose form_id is not listed settles the trigger without starting the graph."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(FACEBOOK_LEAD_ADS_WEBHOOK_TRIGGER_META, config as Record<string, unknown>, "a new lead"),
});
