# Facebook Lead Ads

Facebook Lead Ads for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/facebook-lead-ads-ui` | `npm install @particle-academy/facebook-lead-ads-ui` |
| Node | `@particle-academy/facebook-lead-ads-js` | `npm install @particle-academy/facebook-lead-ads-js` |
| PHP 8.4+ | `particle-academy/facebook-lead-ads-php` | `composer require particle-academy/facebook-lead-ads-php` |
| Python 3.11+ | `fancy-facebook-lead-ads` | `pip install fancy-facebook-lead-ads` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Facebook Lead Ads SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Facebook Lead Ads connection holds 4 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **App ID** | per installation | not secret | From the Meta app dashboard. ONE value for the whole installation. |
| **App secret (OAuth)** | per installation | **secret** | The same app's client secret, used to exchange the authorization code. |
| **App secret (proof and webhook signature)** | per installation | **secret** | TWO roles, one value. It keys the appsecret_proof HMAC on outgoing calls, and it is also what Meta signs INCOMING webhook deliveries with -- there is no per-endpoint webhook secret in the Graph API the way there is in Stripe. It is never sent in either direction. For a standard Meta app this is the same value as the OAuth client secret; it is declared separately because they are different roles, and an app that rotates one without the other should not silently break the other. |
| **Page access token** | per connected account | **secret** | PER PAGE, not per user. Leads belong to a Page's forms, and Meta requires the token to be held by somebody who can advertise on the ad account. A long-lived page token lasts about 60 days and is re-authorised rather than refreshed. |

### Authorising

Facebook Lead Ads uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://www.facebook.com/v25.0/dialog/oauth
- **Token URL** — https://graph.facebook.com/v25.0/oauth/access_token
- **Scopes** — `leads_retrieval`, `pages_manage_ads`, `pages_show_list`, `pages_read_engagement`, `pages_manage_metadata`
- **Access token lifetime** — 5184000 seconds (60 days). A host that never refreshes works all afternoon and is broken by morning.

**This flow issues NO refresh token.** A connection is RE-AUTHORISED rather than refreshed when the access token expires — checked, not assumed.

### The estate

**Facebook Lead Ads has no test estate, and somebody checked.** Everything this connector does is real. Use the faker to build against it.

> Facebook Lead Ads has no sandbox. Meta's Lead Ads Testing Tool creates a test lead on the REAL form, which fires the real webhook and appears alongside real leads until somebody deletes it. Anything this reads is real customer data belonging to a real advertiser.

## What it can do

### Actions

#### `lead_get` — Facebook lead

Read one lead's answers by id. Pair this with the `leadgen` trigger, whose delivery carries only the id.

`GET /{leadId}` · reads only — safe to replay

| Input | Required | What it is |
|---|---|---|
| `leadId` | yes | From the `leadgen_id` on a `leadgen` delivery. It is not the form id and not the ad id -- both are also numeric, and passing one of those returns THAT object rather than an error. |

### Triggers

#### `leadgen` — Facebook lead

Start when somebody submits a Facebook lead form. The delivery carries only IDS -- pair this with the `lead_get` action to read the answers.

Delivered by webhook, and the signature is verified before anything runs.

**You have to set this up with the provider first:**

In the Meta app dashboard, add a Webhooks product, subscribe to the PAGE object and tick the `leadgen` field, and point the callback URL at the route your host mounts for this trigger. Meta first sends a GET carrying `hub.mode=subscribe`, `hub.verify_token` and `hub.challenge` -- the host must echo `hub.challenge` back as the body and check `hub.verify_token` against the value set in the dashboard, or the subscription is never activated. Then subscribe the app to each Page (`POST /{pageId}/subscribed_apps` with `subscribed_fields=leadgen`), which is a SEPARATE step: a webhook configured but not subscribed per Page delivers nothing and reports nothing.

## Run it before you have credentials

Every operation ships a **faker**, whether or not Facebook Lead Ads has a sandbox. Set a
node's mode to `fake` and it returns the shape Facebook Lead Ads actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/facebook-lead-ads`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
