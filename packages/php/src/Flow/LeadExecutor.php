<?php

declare(strict_types=1);

namespace ParticleAcademy\FacebookLeadAds\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\FacebookLeadAds\Actions\LeadGet;
use ParticleAcademy\FacebookLeadAds\FacebookLeadAds;

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
 * Facebook lead, run on a fancy-flow-php host.
 *
 * The PHP twin of `facebookLeadAdsLeadExecutor` in
 * @particle-academy/facebook-lead-ads-js: the same request, built from the
 * node's config by the same `Actions\LeadGet` a host would call directly, and
 * the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Facebook Lead Ads. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/facebook_lead_ads_lead',
    aliases: [
        'facebook_lead_ads_lead',
    ],
    category: 'io',
    label: 'Facebook lead',
    description: 'Read one lead\'s answers by id. Pair this with the `leadgen` trigger, whose delivery carries only the id.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The lead id, echoed back.',
        ],
        [
            'path' => 'data.created_time',
            'type' => 'string',
            'description' => 'ISO 8601 with an offset, e.g. 2026-08-24T09:15:00+0000. NOT the unix seconds the webhook sends for the same event.',
        ],
        [
            'path' => 'data.ad_id',
            'type' => 'string',
            'description' => 'The ad that produced the lead. Absent for an organic submission.',
        ],
        [
            'path' => 'data.form_id',
            'type' => 'string',
            'description' => 'Which lead form was submitted.',
        ],
        [
            'path' => 'data.field_data',
            'type' => 'array',
            'description' => 'The answers, as a LIST of { name, values } rather than a map — so `field_data.email` does not exist and reading one means finding the entry whose `name` matches. The names are the form\'s own field keys, which the advertiser chose, so they differ between forms on the same Page. `values` is an array even for a single-answer question.',
        ],
    ],
)]
final class LeadExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            FacebookLeadAds::descriptor(),
            LeadGet::OPERATION,
            $config,
            [
                'method' => LeadGet::METHOD,
                'path' => LeadGet::path($config),
                'query' => LeadGet::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'facebook_lead_ads lead_get'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
