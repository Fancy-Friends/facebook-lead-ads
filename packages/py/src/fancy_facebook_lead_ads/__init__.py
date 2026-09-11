# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- facebook_lead_ads

"""Facebook Lead Ads for Python.

The service descriptor, its faker, its delivery contract, and one function
per operation — plain HTTP on the stdlib, no vendor SDK and no runtime
dependency.
"""

from __future__ import annotations

from ._fake import FakeValues
from .actions.lead_get import lead_get
from .faker import respond
from .service import BASE_URLS, CONNECTOR_API_VERSION, REQUIRES, SANDBOX, SERVICE, TITLE, descriptor
from .triggers import leadgen

__version__ = "0.1.2"

__all__ = [
    "BASE_URLS",
    "CONNECTOR_API_VERSION",
    "REQUIRES",
    "SANDBOX",
    "SERVICE",
    "TITLE",
    "FakeValues",
    "descriptor",
    "lead_get",
    "leadgen",
    "respond",
]
