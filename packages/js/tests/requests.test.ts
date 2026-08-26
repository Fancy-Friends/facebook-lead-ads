/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */

/**
 * What Facebook Lead Ads actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { facebookLeadAdsLeadGet } from "../src/actions/lead-get.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "clientId": "test_clientId",
  "clientSecret": "test_clientSecret",
  "appSecret": "test_appSecret",
  "pageAccessToken": "test_pageAccessToken"
};

test("lead_get sends GET /{leadId}", async () => {
  const { seen, transport } = capture();

  await facebookLeadAdsLeadGet({
    config: {
      "leadId": "example-leadId"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "GET");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/example-leadId"), seen[0]!.url);

  assert.deepEqual(
    Object.fromEntries(new URL(seen[0]!.url).searchParams),
    {},
  );
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await facebookLeadAdsLeadGet({
    config: {
      "leadId": "example-leadId"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.match(seen[0]!.url, new RegExp("access_token=test_pageAccessToken"));
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    facebookLeadAdsLeadGet({
      config: {},
      credentials: CREDENTIALS,
      mode: "live",
      transport,
    }),
    new RegExp("leadId"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
