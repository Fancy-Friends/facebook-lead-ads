<?php

declare(strict_types=1);

namespace ParticleAcademy\FacebookLeadAds\Triggers;

use ParticleAcademy\Connectors\DeliveryMechanism;
use ParticleAcademy\Connectors\WebhookVerifier;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/triggers/leadgen.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/triggers/leadgen.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */
/**
 * Facebook Lead Ads's webhook trigger — the delivery contract.
 *
 * Kept beside the service descriptor rather than inside a node, because a
 * signature scheme is a fact about FACEBOOK LEAD ADS. The twin of the js
 * package's trigger module.
 */
final class Leadgen
{
    public const OPERATION = 'leadgen';
    public const DELIVERY = DeliveryMechanism::Webhook;

    public const SETUP = 'In the Meta app dashboard, add a Webhooks product, subscribe to the PAGE object and tick the `leadgen` field, and point the callback URL at the route your host mounts for this trigger. Meta first sends a GET carrying `hub.mode=subscribe`, `hub.verify_token` and `hub.challenge` -- the host must echo `hub.challenge` back as the body and check `hub.verify_token` against the value set in the dashboard, or the subscription is never activated. Then subscribe the app to each Page (`POST /{pageId}/subscribed_apps` with `subscribed_fields=leadgen`), which is a SEPARATE step: a webhook configured but not subscribed per Page delivers nothing and reports nothing.';

    /** Header carrying the signature. */
    public const SIGNATURE_HEADER = 'X-Hub-Signature-256';

    /** The credential holding the signing secret. */
    public const SECRET_CREDENTIAL = 'appSecret';

    /** @return array{signature: ?string, timestamp: ?string} */
    public static function parseSignature(string $raw): array
    {
        $prefix = 'sha256=';

        return [
            'signature' => str_starts_with($raw, $prefix) ? substr($raw, strlen($prefix)) : $raw,
            'timestamp' => null,
        ];
    }

    /** The exact bytes Facebook Lead Ads signs. */
    public static function signedPayload(string $raw, ?string $timestamp): string
    {
        return $raw;
    }

    /**
     * Verify one inbound Facebook Lead Ads delivery.
     *
     * The host calls this BEFORE starting a run, with the body exactly as
     * received. Re-serialised JSON changes key order and whitespace and produces a
     * mismatch that looks precisely like a wrong secret — hours spent debugging
     * the wrong thing.
     *
     * @param array<string,string|list<string>> $headers
     * @return array{ok: bool, reason: ?string}
     */
    public static function verifyDelivery(
        string $raw,
        array $headers,
        ?string $appSecret,
        ?int $now = null,
    ): array {
        $header = WebhookVerifier::header($headers, self::SIGNATURE_HEADER);
        $parsed = $header === null
            ? ['signature' => null, 'timestamp' => null]
            : self::parseSignature($header);

        return WebhookVerifier::verify(
            raw: $raw,
            signature: $parsed['signature'],
            secret: $appSecret,
            payload: self::signedPayload(...),
            algorithm: 'sha256',
            timestamp: $parsed['timestamp'],
            now: $now,
        );
    }
}
