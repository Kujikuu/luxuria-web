<?php

namespace App\Observers;

use App\Helpers\SystemSettingsHelper;
use App\Models\Faq;

class FaqObserver
{
    /**
     * Handle the Faq "created" event.
     */
    public function created(Faq $faq): void
    {
        SystemSettingsHelper::clearCache();
    }

    /**
     * Handle the Faq "updated" event.
     */
    public function updated(Faq $faq): void
    {
        SystemSettingsHelper::clearCache();
    }

    /**
     * Handle the Faq "deleted" event.
     */
    public function deleted(Faq $faq): void
    {
        SystemSettingsHelper::clearCache();
    }

    /**
     * Handle the Faq "restored" event.
     */
    public function restored(Faq $faq): void
    {
        SystemSettingsHelper::clearCache();
    }

    /**
     * Handle the Faq "force deleted" event.
     */
    public function forceDeleted(Faq $faq): void
    {
        SystemSettingsHelper::clearCache();
    }
}
