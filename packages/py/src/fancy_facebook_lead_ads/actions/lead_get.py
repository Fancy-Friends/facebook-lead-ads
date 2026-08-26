# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/lead-get.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/lead-get.json (or weaver's template/) and regenerate:
#
# npm run provider -- facebook_lead_ads

"""Read one lead's answers by id. Pair this with the `leadgen` trigger, whose
delivery carries only the id.

GET /{leadId} —
https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving

This describes the request. `call` resolves the connection, picks the
estate, and either calls Facebook Lead Ads or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "lead_get"
METHOD = "GET"
PATH = "/{leadId}"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("leadId") is None or config.get("leadId") == "":
        raise ConnectorConfigError(
            "lead_get: \"leadId\" is required (Lead ID)."
        )

    out: dict[str, Any] = {}

    return out



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/"
        + quote(str(config.get("leadId") or ""), safe="")
    )

def lead_get(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Read one lead's answers by id. Pair this with the `leadgen` trigger, whose delivery carries
    only the id.
    """
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
