/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ + triggers/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ + triggers/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */

/**
 * Facebook Lead Ads's node kinds with their TypeScript executors attached —
 * for hosts that EXECUTE on TS.
 *
 * The authoring surface in @particle-academy/facebook-lead-ads-ui carries no
 * executor: the editor is React on every host, so a PHP or Python project
 * installs the ui package and never this one.
 */

import type { NodeExecutor, NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import {
  idempotencyKeyFor,
  NO_IDEMPOTENCY_KEY_WARNING,
  resolveConnection,
  triggerEvent,
  type RequestedMode,
} from "@particle-academy/fancy-connector-core";
import { FACEBOOK_LEAD_ADS } from "./service.js";

import {
  facebookLeadAdsLeadKind,
  facebookLeadAdsWebhookTriggerKind,
} from "@particle-academy/facebook-lead-ads-ui";

import { facebookLeadAdsLeadGet } from "./actions/lead-get.js";
import { FACEBOOK_LEAD_ADS_LEADGEN } from "./triggers/leadgen.js";

export const facebookLeadAdsLeadExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await facebookLeadAdsLeadGet({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `facebook_lead_ads lead_get ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const facebookLeadAdsWebhookTriggerExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});
  const connection = resolveConnection({
    service: FACEBOOK_LEAD_ADS.service,
    operation: "leadgen",
    sandbox: FACEBOOK_LEAD_ADS.sandbox,
    baseUrls: FACEBOOK_LEAD_ADS.baseUrls,
    requires: FACEBOOK_LEAD_ADS.requires,
    connectionId: typeof config.connection === "string" ? config.connection : null,
    requested: typeof config.mode === "string" ? (config.mode as RequestedMode) : null,
  });

  const event = triggerEvent(FACEBOOK_LEAD_ADS_LEADGEN, connection, ctx.inputs?.in, config);

  return { __port: "out", value: event };
};

/** The kinds a TypeScript host registers. */
export const FACEBOOK_LEAD_ADS_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...facebookLeadAdsLeadKind, executor: facebookLeadAdsLeadExecutor },
  { ...facebookLeadAdsWebhookTriggerKind, executor: facebookLeadAdsWebhookTriggerExecutor },
];
