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
 * Read one lead's answers by id. Pair this with the `leadgen` trigger, whose
 * delivery carries only the id.
 *
 * GET /{leadId} —
 * https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Facebook Lead Ads or calls
 * the faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { FACEBOOK_LEAD_ADS } from "../service.js";

export const LEAD_GET_OPERATION = "lead_get";

export type LeadGetOptions = {
  /** The node's resolved config. Keys: leadId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function facebookLeadAdsLeadGet(options: LeadGetOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.leadId === undefined || config.leadId === null || config.leadId === "") {
    throw new Error(`lead_get: "leadId" is required (Lead ID).`);
  }

  return callConnector(FACEBOOK_LEAD_ADS, {
    operation: LEAD_GET_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/${encodeURIComponent(String(config.leadId))}`,
      query: {},
    },
  });
}
