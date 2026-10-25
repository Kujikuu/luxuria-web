<?php

namespace App\Services;

use App\Models\ContactInquiry;
use App\Models\User;
use DomainException;
use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;

class PromoteContactLead
{
    public function __construct(private SniperHubIntake $intake) {}

    /**
     * An authenticated admin explicitly promotes an existing local lead.
     * A stable source-record key also covers retries after an uncertain response.
     */
    public function handle(ContactInquiry $lead, User $approver): string
    {
        Gate::forUser($approver)->authorize('promote-contact-lead', $lead);

        try {
            return Cache::lock('luxuria-hub-contact-'.$lead->getKey(), 90)
                ->block(5, fn (): string => $this->send((int) $lead->getKey(), $approver));
        } catch (LockTimeoutException) {
            throw new DomainException('This lead is already being promoted. Try again in a minute.');
        }
    }

    private function send(int $leadId, User $approver): string
    {
        $lead = ContactInquiry::query()->findOrFail($leadId);

        if ($lead->hub_uid !== null) {
            return $lead->hub_uid;
        }

        if (! $lead->isLead() || $lead->consented_at === null || blank($lead->last_name)) {
            throw new DomainException('This record has no complete lead details and recorded consent. Legacy enquiries cannot be promoted.');
        }

        $target = $lead->request_type === 'project_owner' ? 'application' : 'lead';
        $track = $lead->request_type;

        if ($track === 'other') {
            throw new DomainException('The Sniper Hub track for Other has not been confirmed. Keep this lead pending until its destination is reviewed and implemented.');
        }

        $locale = in_array($lead->locale, ['ar', 'en'], true) ? $lead->locale : 'en';
        $payload = [
            'first_name' => $lead->first_name,
            'last_name' => $lead->last_name,
            'email' => $lead->email,
            'phone' => $lead->phone,
            'consent' => true,
            'utm' => ['source' => 'luxuria_contact'],
        ];

        if ($target === 'application') {
            $payload['description'] = $lead->message;
            $payload['extra'] = [[
                'key' => 'lead_type',
                'label_en' => 'Lead type',
                'label_ar' => 'نوع العميل',
                'value' => $lead->typeLabel($locale),
            ]];
        } else {
            $payload['track'] = $track;
            $payload['message'] = $lead->message;
            $payload['industries'] = [];
            $payload['company'] = null;
        }

        $uid = $this->intake->submit($target, $payload, $locale, 'luxuria-contact-inquiry-'.$leadId);

        $lead->forceFill([
            'hub_uid' => $uid,
            'hub_target' => $target,
            'promoted_at' => now(),
            'promoted_by' => $approver->getKey(),
        ])->save();

        return $uid;
    }
}
