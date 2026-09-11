<?php

declare(strict_types=1);

namespace ParticleAcademy\FacebookLeadAds\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use ParticleAcademy\Connectors\ConnectionHost;
use ParticleAcademy\Connectors\TriggerEvent;
use ParticleAcademy\FacebookLeadAds\FacebookLeadAds;
use ParticleAcademy\FacebookLeadAds\Triggers\Leadgen;

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
 * Facebook lead, run on a fancy-flow-php host.
 *
 * The PHP twin of `facebookLeadAdsWebhookTriggerExecutor` in
 * @particle-academy/facebook-lead-ads-js. A webhook trigger never calls
 * Facebook Lead Ads: it republishes, on `out`, the delivery the HOST received
 * and verified at its own route. With nothing delivered, fake mode publishes
 * the faker's sample event, so a flow can be designed before the endpoint
 * exists; any other mode refuses, and says how to deliver one.
 */
#[FlowNode(
    name: '@particle-academy/facebook_lead_ads_webhook_trigger',
    aliases: [
        'facebook_lead_ads_webhook_trigger',
    ],
    category: 'trigger',
    label: 'Facebook lead',
    description: 'Start when somebody submits a Facebook lead form. The delivery carries only IDS -- pair this with the `lead_get` action to read the answers.',
    icon: '◆',
    inputs: [],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'leadgen_id',
            'type' => 'string',
            'description' => 'The lead\'s id, and the ONLY way to reach the answers -- pass it to `lead_get`. Meta redelivers on failure, and there is no timestamp in the signature, so dedupe on this.',
        ],
        [
            'path' => 'page_id',
            'type' => 'string',
            'description' => 'The Page the form belongs to.',
        ],
        [
            'path' => 'form_id',
            'type' => 'string',
            'description' => 'Which lead form was submitted. Branch on this when one Page runs several.',
        ],
        [
            'path' => 'ad_id',
            'type' => 'string',
            'description' => 'The ad that produced the lead. Absent for an organic form submission.',
        ],
        [
            'path' => 'adgroup_id',
            'type' => 'string',
            'description' => 'The ad set. Meta still calls it adgroup on this payload.',
        ],
        [
            'path' => 'created_time',
            'type' => 'number',
            'description' => 'Unix seconds. When the person submitted, not when the delivery arrived.',
        ],
    ],
)]
final class WebhookTriggerExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectionHost $host = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();
        $service = FacebookLeadAds::descriptor();

        $connection = ($this->host ?? new ConnectionHost)->resolve(
            $service->service,
            Leadgen::OPERATION,
            $config,
            $service->sandbox,
            $service->requires,
            $service->baseUrls,
        );

        $event = TriggerEvent::resolve(
            $service->service,
            Leadgen::OPERATION,
            Leadgen::DELIVERY,
            Leadgen::SETUP,
            $service->faker,
            $connection,
            $ctx->input('in'),
            $config,
        );

        return Port::only('out', $event);
    }
}
