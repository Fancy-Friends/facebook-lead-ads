# Changelog

All notable changes to `@particle-academy/facebook-lead-ads-ui`,
`@particle-academy/facebook-lead-ads-js`,
`particle-academy/facebook-lead-ads-php` and `fancy-facebook-lead-ads`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.1.0] — 2026-08-24

First release.

### Added

- `leadgen` — a webhook trigger that starts when somebody submits a lead form.
- `lead_get` — read one lead's answers by id. `GET /{leadId}`.
- Fakers for both, so a flow can be wired before Meta has ever been contacted.

### The delivery carries IDS, and no answers

This is the shape worth understanding before wiring anything. Meta's `leadgen`
webhook sends `leadgen_id`, `page_id`, `form_id`, `ad_id`, `adgroup_id` and
`created_time` — and **nothing else**. The name, the email and the phone number
are not in it. Reading them means a second call, which is what `lead_get` is.

So the trigger's faker returns ids and nothing else too. A faker that helpfully
invented an `email` would let somebody wire `{{ $json.email }}`, watch it work on
the canvas, and discover on the first real lead that the field was never there.

### The first `prefixed` signature header

Meta signs every delivery with `X-Hub-Signature-256`, quoting its own docs,
"preceded with `sha256=`". Stripe — the only webhook provider before this —
packs a timestamp and signature into one compound header instead. So
`verification.header.format: "prefixed"` had been declared in the vocabulary
since Stripe and **driven by nothing**, which is exactly the shape this kit keeps
finding: a declaration that validates clean and does nothing. It is exercised for
real now, by a suite that runs the generated PHP and Python against it.

### There is no timestamp, so there is no replay window

Stripe signs `{timestamp}.{body}` and a delivery older than the tolerance is
refused. Meta signs the body alone. **A captured delivery therefore stays valid
forever**, and replay protection cannot come from the signature — it has to come
from de-duplicating on `leadgen_id`. The definition says so rather than leaving
`tolerance` absent, because an absence looks like an oversight.

### One secret, two directions

`appSecret` keys the `appsecret_proof` HMAC on **outgoing** calls and is what
Meta signs **incoming** webhooks with. There is no per-endpoint webhook secret
here the way there is in Stripe, where a leaked secret exposes one endpoint.

The practical consequence: **rotating the app secret invalidates outgoing proofs
and incoming signatures at the same instant.** A host that updates one credential
field and not the other has broken the half it did not touch.

### `leads_retrieval` fails quietly if you skip it

Five scopes, and each is load-bearing:

| | |
|---|---|
| `leads_retrieval` | reads a lead's `field_data`. **Without it the lead resolves with the personal data omitted rather than failing** — the reassuring failure. Also requires the app to pass Meta's Business Verification. |
| `pages_manage_ads` | what Meta requires alongside it for lead access. |
| `pages_manage_metadata` | what lets the app SUBSCRIBE to a Page's `leadgen` webhook. Without it the trigger never fires and nothing reports why. |
| `pages_show_list`, `pages_read_engagement` | the standard Page pair. |

Subscribing the app **per Page** (`POST /{pageId}/subscribed_apps`) is a separate
step from configuring the webhook. A webhook configured but not subscribed
delivers nothing, silently.

### No sandbox — checked

Meta's Lead Ads Testing Tool submits a **test lead against a real form on a real
Page**, and it fires the real webhook. That is a way to exercise the integration,
not a test estate: the lead lands where a real one does and is deleted by hand.
No separate host, no separate account, no mode flag on the request.

Everything this reads is real customer data belonging to a real advertiser.

### Pinned to v25.0, not the newest

Meta supports a Graph API version for roughly two years — v25.0 runs to
2028-07-29 — and versioned changes land on the **newest** version immediately and
reach older ones later. The newest buys a few months of runway and takes every
breaking change first. An unversioned call silently gets the **oldest**
still-supported version, which is why the segment is pinned at all.

[0.1.0]: https://github.com/Fancy-Friends/facebook-lead-ads/releases/tag/v0.1.0
