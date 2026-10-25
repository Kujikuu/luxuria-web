<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactInquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_type',
        'first_name',
        'last_name',
        'locale',
        'consented_at',
        'phone',
        'email',
        'message',
        'is_read',
        'read_at',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
            'consented_at' => 'datetime',
            'promoted_at' => 'datetime',
            'read_at' => 'datetime',
        ];
    }

    /** @return array<string, string> */
    public static function leadTypes(?string $locale = null): array
    {
        return collect(['broker', 'investor', 'project_owner', 'other'])
            ->mapWithKeys(fn (string $type): array => [$type => __('pages.contact_type_'.$type, [], $locale)])
            ->all();
    }

    public function isLead(): bool
    {
        return array_key_exists($this->request_type, self::leadTypes());
    }

    public function typeLabel(?string $locale = null): string
    {
        return self::leadTypes($locale)[$this->request_type] ?? match ($this->request_type) {
            'buy' => 'Buy Property',
            'sell' => 'Sell Property',
            'rent' => 'Consulting',
            default => $this->request_type,
        };
    }

    public function promoter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'promoted_by');
    }

    public function promotionStatus(): string
    {
        return $this->hub_uid !== null ? 'Promoted' : ($this->isLead() ? 'Pending approval' : 'Legacy enquiry');
    }

    public function markAsRead(): void
    {
        $this->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
    }
}
