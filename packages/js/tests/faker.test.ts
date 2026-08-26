/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { facebookLeadAdsFaker } from "../src/faker.js";

test("lead_get fakes the shape Facebook Lead Ads publishes", () => {
  const config = {};

  const faked = facebookLeadAdsFaker("lead_get", fakeRequest("facebook_lead_ads", "lead_get", config));

  assert.deepEqual(faked, {
    "id": "191900457289918",
    "created_time": "2026-08-24T09:15:00+0000",
    "ad_id": "168815007024870",
    "form_id": "060920582515030",
    "field_data": [
      {
        "name": "full_name",
        "values": [
          "Ada Lovelace"
        ]
      },
      {
        "name": "email",
        "values": [
          "ada@example.test"
        ]
      },
      {
        "name": "phone_number",
        "values": [
          "+15550100"
        ]
      },
      {
        "name": "what_are_you_interested_in",
        "values": [
          "Enterprise plan"
        ]
      }
    ]
  });
});

test("leadgen fakes the shape Facebook Lead Ads publishes", () => {
  const config = {};

  const faked = facebookLeadAdsFaker("leadgen", fakeRequest("facebook_lead_ads", "leadgen", config));

  assert.deepEqual(faked, {
    "leadgen_id": "468953268954264",
    "page_id": "532534889523422",
    "form_id": "316351458321633",
    "ad_id": "156988700792330",
    "adgroup_id": "872851253662082",
    "created_time": 1787577300
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => facebookLeadAdsFaker("no_such_operation", fakeRequest("facebook_lead_ads", "no_such_operation", {})), /no fake response/);
});
