/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/lead-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/lead-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */

/**
 * Facebook lead — Read one lead's answers by id. Pair this with the `leadgen`
 * trigger, whose delivery carries only the id.
 *
 * https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { facebookLeadAdsMeta } from "../service.js";

export const FACEBOOK_LEAD_ADS_LEAD_KIND = "@particle-academy/facebook_lead_ads_lead";
export const FACEBOOK_LEAD_ADS_LEAD_OPERATION = "lead_get";

export const FACEBOOK_LEAD_ADS_LEAD_META = facebookLeadAdsMeta("action", "read a lead", "https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const FACEBOOK_LEAD_ADS_LEAD_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The lead id, echoed back."
  },
  {
    "path": "data.created_time",
    "type": "string",
    "description": "ISO 8601 with an offset, e.g. 2026-08-24T09:15:00+0000. NOT the unix seconds the webhook sends for the same event."
  },
  {
    "path": "data.ad_id",
    "type": "string",
    "description": "The ad that produced the lead. Absent for an organic submission."
  },
  {
    "path": "data.form_id",
    "type": "string",
    "description": "Which lead form was submitted."
  },
  {
    "path": "data.field_data",
    "type": "array",
    "description": "The answers, as a LIST of { name, values } rather than a map — so `field_data.email` does not exist and reading one means finding the entry whose `name` matches. The names are the form's own field keys, which the advertiser chose, so they differ between forms on the same Page. `values` is an array even for a single-answer question."
  }
];

export const facebookLeadAdsLeadKind: NodeKindDefinition = defineConnectorKind(FACEBOOK_LEAD_ADS_LEAD_META, {
  name: FACEBOOK_LEAD_ADS_LEAD_KIND,
  aliases: ["facebook_lead_ads_lead"],
  label: "Facebook lead",
  description: "Read one lead's answers by id. Pair this with the `leadgen` trigger, whose delivery carries only the id.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: FACEBOOK_LEAD_ADS_LEAD_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "leadId",
      "label": "Lead ID",
      "required": true,
      "description": "From the `leadgen_id` on a `leadgen` delivery. It is not the form id and not the ad id -- both are also numeric, and passing one of those returns THAT object rather than an error."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(FACEBOOK_LEAD_ADS_LEAD_META, config as Record<string, unknown>, "read a lead"),
});
