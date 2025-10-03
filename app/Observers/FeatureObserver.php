<?php

namespace App\Observers;

use App\Helpers\SystemSettingsHelper;
use App\Models\Feature;

class FeatureObserver
{
    /**
     * Handle the Feature "created" event.
     */
    public function created(Feature $feature): void
    {
        SystemSettingsHelper::clearCache();
    }

    /**
     * Handle the Feature "updated" event.
     */
    public function updated(Feature $feature): void
    {
        SystemSettingsHelper::clearCache();
    }

    /**
     * Handle the Feature "deleted" event.
     */
    public function deleted(Feature $feature): void
    {
        SystemSettingsHelper::clearCache();
    }

    /**
     * Handle the Feature "restored" event.
     */
    public function restored(Feature $feature): void
    {
        SystemSettingsHelper::clearCache();
    }

    /**
     * Handle the Feature "force deleted" event.
     */
    public function forceDeleted(Feature $feature): void
    {
        SystemSettingsHelper::clearCache();
    }
}
