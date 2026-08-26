"""
Facebook Lead Ads — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_facebook_lead_ads._fake import FakeValues, seed_for_call
from fancy_facebook_lead_ads.faker import respond

GOLDENS = [
    {
        "operation": "lead_get",
        "config": {},
        "expected": {
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
        },
    },
    {
        "operation": "leadgen",
        "config": {},
        "expected": {
            "leadgen_id": "468953268954264",
            "page_id": "532534889523422",
            "form_id": "316351458321633",
            "ad_id": "156988700792330",
            "adgroup_id": "872851253662082",
            "created_time": 1787577300,
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-facebook-lead-ads")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("facebook_lead_ads", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
