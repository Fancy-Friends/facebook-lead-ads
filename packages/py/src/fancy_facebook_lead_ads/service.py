# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- facebook_lead_ads

"""Facebook Lead Ads, as one service descriptor shared by every Facebook Lead
Ads operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Facebook Lead Ads has no sandbox. Meta's Lead Ads Testing Tool creates a
test lead on the REAL form, which fires the real webhook and appears
alongside real leads until somebody deletes it. Anything this reads is real
customer data belonging to a real advertiser.
"""

from __future__ import annotations

import hashlib
import hmac

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "facebook_lead_ads"
TITLE = "Facebook Lead Ads"
SANDBOX = "none"
BASE_URLS = {
    "live": "https://graph.facebook.com/v25.0",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "pageAccessToken",
    "appSecret",
    "clientId",
    "clientSecret",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Facebook Lead Ads's auth scheme to an outgoing request.
    
    Same as facebook-pages: Meta takes the token as a QUERY PARAMETER, and
    appsecret_proof has to go in the query regardless, so both live in one place
    and a request stays readable in a log.
    """
    request.query["access_token"] = str(credentials.get("pageAccessToken") or "")

    proof = hmac.new(
        str(credentials.get("appSecret") or "").encode("utf-8"),
        str(credentials.get("pageAccessToken") or "").encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    request.query["appsecret_proof"] = proof


def descriptor() -> ServiceDescriptor:
    """The Facebook Lead Ads service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
