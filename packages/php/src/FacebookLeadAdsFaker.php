<?php

declare(strict_types=1);

namespace ParticleAcademy\FacebookLeadAds;

use ParticleAcademy\Connectors\FakeRequest;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- facebook_lead_ads
 */
/**
 * The Facebook Lead Ads faker — the PHP twin of the js package's
 * `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class FacebookLeadAdsFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'lead_get' => self::LeadGet($config, $fake),
            'leadgen' => self::Leadgen($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'facebook_lead_ads: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function LeadGet(array $config, mixed $fake): array
    {
        return [
        'id' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 15))),
        'created_time' => '2026-08-24T09:15:00+0000',
        'ad_id' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 15))),
        'form_id' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 15))),
        'field_data' => [
            [
                'name' => 'full_name',
                'values' => [
                    'Ada Lovelace',
                ],
            ],
            [
                'name' => 'email',
                'values' => [
                    'ada@example.test',
                ],
            ],
            [
                'name' => 'phone_number',
                'values' => [
                    '+15550100',
                ],
            ],
            [
                'name' => 'what_are_you_interested_in',
                'values' => [
                    'Enterprise plan',
                ],
            ],
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function Leadgen(array $config, mixed $fake): array
    {
        $boundLeadid = implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 15)));

        return [
        'leadgen_id' => $boundLeadid,
        'page_id' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 15))),
        'form_id' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 15))),
        'ad_id' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 15))),
        'adgroup_id' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 15))),
        'created_time' => 1787577300,
    ];
    }
}
