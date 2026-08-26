<?php

declare(strict_types=1);

namespace ParticleAcademy\FacebookLeadAds\Actions;

use ParticleAcademy\FacebookLeadAds\FacebookLeadAds;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/lead-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/lead-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */
/**
 * Read one lead's answers by id. Pair this with the `leadgen` trigger, whose
 * delivery carries only the id.
 *
 * GET /{leadId} —
 * https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Facebook Lead Ads or calls the faker.
 */
final class LeadGet
{
    public const OPERATION = 'lead_get';
    public const METHOD = 'GET';
    public const PATH = '/{leadId}';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Facebook Lead Ads.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['leadId'] ?? null) === null || ($config['leadId'] ?? null) === '') {
            throw new ConnectorConfigException('lead_get: "leadId" is required (Lead ID).');
        }

        $body = [];

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/'.rawurlencode((string) ($config['leadId'] ?? ''));
    }
}
