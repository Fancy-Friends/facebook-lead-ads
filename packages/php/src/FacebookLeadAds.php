<?php

declare(strict_types=1);

namespace ParticleAcademy\FacebookLeadAds;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */
/**
 * Facebook Lead Ads, as one service descriptor shared by every Facebook Lead
 * Ads operation.
 *
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Facebook Lead Ads has no sandbox. Meta's Lead Ads Testing Tool creates a
 * test lead on the REAL form, which fires the real webhook and appears
 * alongside real leads until somebody deletes it. Anything this reads is real
 * customer data belonging to a real advertiser.
 */
final class FacebookLeadAds
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'facebook_lead_ads';

    public const LIVE_URL = 'https://graph.facebook.com/v25.0';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'pageAccessToken',
        'appSecret',
        'clientId',
        'clientSecret',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'Facebook Lead Ads',
            sandbox: SandboxKind::None,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            // The core calls a faker ($operation, $config, $fake, $input); respond()
            // takes TypeScript's FakeRequest shape. This is the translation.
            faker: static fn (string $operation, array $config, FakeValues $fake, mixed $input = null): mixed => FacebookLeadAdsFaker::respond(
                $operation,
                ['config' => $config, 'fake' => $fake, 'input' => $input],
            ),
        );
    }

    /**
     * Apply Facebook Lead Ads's auth scheme to an outgoing request.
     *
     * Same as facebook-pages: Meta takes the token as a QUERY PARAMETER, and
     * appsecret_proof has to go in the query regardless, so both live in one place
     * and a request stays readable in a log.
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $separator = str_contains($request->url, '?') ? '&' : '?';
        $request->url .= $separator.rawurlencode('access_token').'='.rawurlencode((string) ($credentials['pageAccessToken'] ?? ''));

        $proof = hash_hmac('sha256', (string) ($credentials['pageAccessToken'] ?? ''), (string) ($credentials['appSecret'] ?? ''));
        $request->url .= '&'.rawurlencode('appsecret_proof').'='.$proof;
    }
}
