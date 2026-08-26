# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- facebook_lead_ads

"""The Facebook Lead Ads faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _lead_get(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "id": "".join(str(fake.int(0, 9)) for _ in range(15)),
        "created_time": "2026-08-24T09:15:00+0000",
        "ad_id": "".join(str(fake.int(0, 9)) for _ in range(15)),
        "form_id": "".join(str(fake.int(0, 9)) for _ in range(15)),
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


def _leadgen(config: dict[str, Any], fake: FakeValues) -> Any:
    bound_leadid = "".join(str(fake.int(0, 9)) for _ in range(15))

    return {
        "leadgen_id": bound_leadid,
        "page_id": "".join(str(fake.int(0, 9)) for _ in range(15)),
        "form_id": "".join(str(fake.int(0, 9)) for _ in range(15)),
        "ad_id": "".join(str(fake.int(0, 9)) for _ in range(15)),
        "adgroup_id": "".join(str(fake.int(0, 9)) for _ in range(15)),
        "created_time": 1787577300,
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "lead_get":
        return _lead_get(config, fake)

    if operation == "leadgen":
        return _leadgen(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'facebook_lead_ads: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
