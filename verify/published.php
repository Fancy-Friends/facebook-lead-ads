<?php

declare(strict_types=1);

/*
 * Facebook Lead Ads — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/facebook-lead-ads-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\FacebookLeadAds\FacebookLeadAdsFaker;

$goldens = [
    [
        'operation' => 'lead_get',
        'config' => [],
        'expected' => [
            'id' => '191900457289918',
            'created_time' => '2026-08-24T09:15:00+0000',
            'ad_id' => '168815007024870',
            'form_id' => '060920582515030',
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
        ],
    ],
    [
        'operation' => 'leadgen',
        'config' => [],
        'expected' => [
            'leadgen_id' => '468953268954264',
            'page_id' => '532534889523422',
            'form_id' => '316351458321633',
            'ad_id' => '156988700792330',
            'adgroup_id' => '872851253662082',
            'created_time' => 1787577300,
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('facebook_lead_ads', $operation, $config));
    $faked = FacebookLeadAdsFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
