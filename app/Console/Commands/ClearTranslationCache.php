<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class ClearTranslationCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'translations:clear-cache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear translation cache to refresh database changes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Clear Laravel's cache
        Cache::flush();
        
        // Clear config cache 
        $this->call('config:clear');
        
        // Clear view cache
        $this->call('view:clear');
        
        $this->info('Translation cache cleared successfully!');
        $this->info('Database translation changes should now be visible.');
        
        return Command::SUCCESS;
    }
}
