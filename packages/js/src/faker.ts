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
 * The Facebook Lead Ads faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Facebook Lead Ads actually publishes, so an author can wire {{
 * $json.data.id }} against a fake and have it keep working against the real
 * thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeLeadGet({ config, fake }: FakeRequest): unknown {
  return {
    "id": Array.from({ length: 15 }, () => fake.int(0, 9)).join(""),
    "created_time": "2026-08-24T09:15:00+0000",
    "ad_id": Array.from({ length: 15 }, () => fake.int(0, 9)).join(""),
    "form_id": Array.from({ length: 15 }, () => fake.int(0, 9)).join(""),
    "field_data": [
      {
        "name": "full_name",
        "values": [
          "Ada Lovelace",
        ],
      },
      {
        "name": "email",
        "values": [
          "ada@example.test",
        ],
      },
      {
        "name": "phone_number",
        "values": [
          "+15550100",
        ],
      },
      {
        "name": "what_are_you_interested_in",
        "values": [
          "Enterprise plan",
        ],
      },
    ],
  };
}

function fakeLeadgen({ config, fake }: FakeRequest): unknown {
  const boundLeadid = Array.from({ length: 15 }, () => fake.int(0, 9)).join("");

  return {
    "leadgen_id": boundLeadid,
    "page_id": Array.from({ length: 15 }, () => fake.int(0, 9)).join(""),
    "form_id": Array.from({ length: 15 }, () => fake.int(0, 9)).join(""),
    "ad_id": Array.from({ length: 15 }, () => fake.int(0, 9)).join(""),
    "adgroup_id": Array.from({ length: 15 }, () => fake.int(0, 9)).join(""),
    "created_time": 1787577300,
  };
}

export const facebookLeadAdsFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "lead_get":
      return fakeLeadGet(request);

    case "leadgen":
      return fakeLeadgen(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `facebook_lead_ads: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
