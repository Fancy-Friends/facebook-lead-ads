# GENERATED FILE — do not edit.
#
# Emitted from provider/triggers/leadgen.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/triggers/leadgen.json (or weaver's template/) and regenerate:
#
# npm run provider -- facebook_lead_ads

"""Facebook Lead Ads's webhook trigger — the delivery contract.

Kept beside the service descriptor rather than inside a node, because a
signature scheme is a fact about FACEBOOK LEAD ADS.
"""

from __future__ import annotations

from typing import Any

from .._runtime import Verification, verify_hmac
from ..faker import respond
from ..service import SERVICE

OPERATION = "leadgen"
DELIVERY = "webhook"
SETUP = (
    "In the Meta app dashboard, add a Webhooks product, subscribe to the PAGE object and tick "
    "the `leadgen` field, and point the callback URL at the route your host mounts for this "
    "trigger. Meta first sends a GET carrying `hub.mode=subscribe`, `hub.verify_token` and "
    "`hub.challenge` -- the host must echo `hub.challenge` back as the body and check "
    "`hub.verify_token` against the value set in the dashboard, or the subscription is never "
    "activated. Then subscribe the app to each Page (`POST /{pageId}/subscribed_apps` with "
    "`subscribed_fields=leadgen`), which is a SEPARATE step: a webhook configured but not "
    "subscribed per Page delivers nothing and reports nothing."
)
SIGNATURE_HEADER = "X-Hub-Signature-256"
ALGORITHM = "sha256"
SIGNATURE_ENCODING = "hex"

# WHICH credential holds the signing secret — a field name, not a secret.
# S105 reads any string assigned to a *_CREDENTIAL name as a hardcoded
# password; here the value is the key to look up on the connection.
SECRET_CREDENTIAL = "appSecret"  # noqa: S105


def parse_signature(raw: str) -> tuple[str | None, str | None]:
    """Strip the `sha256=` prefix the provider sends."""
    prefix = "sha256="

    return (raw[len(prefix):] if raw.startswith(prefix) else raw), None


def signed_payload(raw: str, timestamp: str | None) -> str:
    """The exact bytes Facebook Lead Ads signs."""
    return raw


def verify_delivery(
    raw: str,
    headers: dict[str, str],
    appsecret: str | None,
    now: int | None = None,
) -> Verification:
    """Verify one inbound Facebook Lead Ads delivery.
    
    The host calls this BEFORE starting a run, with the body exactly as
    received. Re-serialised JSON changes key order and whitespace and produces a
    mismatch that looks precisely like a wrong secret — hours of debugging the
    wrong thing.
    """
    header = next(
        (v for k, v in headers.items() if k.lower() == SIGNATURE_HEADER.lower()),
        None,
    )
    signature, timestamp = parse_signature(header) if header else (None, None)

    return verify_hmac(
        raw=raw,
        signature=signature,
        secret=appsecret,
        payload=signed_payload,
        algorithm=ALGORITHM,
        encoding=SIGNATURE_ENCODING,
        tolerance=None,
        timestamp=timestamp,
        now=now,
    )


def sample_event(config: dict[str, Any] | None = None) -> Any:
    """A faked sample event, so the trigger is runnable before any of the setup
    above.
    
    An author can see the real field names and wire the downstream nodes against
    them before the provider has ever been contacted.
    """
    from .._fake import FakeValues, seed_for_call

    resolved = config or {}
    fake = FakeValues(seed_for_call(SERVICE, OPERATION, resolved))

    return respond(OPERATION, {"config": resolved, "fake": fake})
