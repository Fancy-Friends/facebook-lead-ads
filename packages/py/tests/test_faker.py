# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- facebook_lead_ads

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_facebook_lead_ads._fake import FakeValues, seed_for_call
from fancy_facebook_lead_ads.faker import respond


def test_lead_get_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("facebook_lead_ads", "lead_get", config))

    faked = respond("lead_get", {"config": config, "fake": fake})

    assert faked == {
        "id": "191900457289918",
        "created_time": "2026-08-24T09:15:00+0000",
        "ad_id": "168815007024870",
        "form_id": "060920582515030",
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
    }


def test_leadgen_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("facebook_lead_ads", "leadgen", config))

    faked = respond("leadgen", {"config": config, "fake": fake})

    assert faked == {
        "leadgen_id": "468953268954264",
        "page_id": "532534889523422",
        "form_id": "316351458321633",
        "ad_id": "156988700792330",
        "adgroup_id": "872851253662082",
        "created_time": 1787577300,
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("facebook_lead_ads", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
