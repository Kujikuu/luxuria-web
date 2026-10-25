<?php

namespace App\Filament\Resources\ContactInquiries;

use App\Models\ContactInquiry;
use App\Models\User;
use App\Services\PromoteContactLead;
use App\Services\SniperHubIntake;
use DomainException;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use RuntimeException;

class PromoteLeadAction
{
    public static function make(): Action
    {
        return Action::make('promote')
            ->label('Approve & promote to Sniper Hub')
            ->icon('heroicon-o-arrow-up-right')
            ->visible(fn (ContactInquiry $record): bool => Gate::allows('promote-contact-lead', $record) && $record->isLead() && $record->hub_uid === null)
            ->disabled(fn (ContactInquiry $record): bool => $record->request_type === 'other' || ! SniperHubIntake::isEnabled())
            ->tooltip(fn (ContactInquiry $record): ?string => $record->request_type === 'other'
                ? 'Other stays local until its Hub destination is confirmed.'
                : (! SniperHubIntake::isEnabled() ? 'Sniper Hub connection is disabled.' : null))
            ->requiresConfirmation()
            ->modalHeading('Approve this lead for Sniper Hub?')
            ->modalDescription('This is your approval to share the lead with Sniper Hub. Project owners become applications; investors and brokers enter their own lead track. Hub may email an application owner. Other stays pending until its Hub track is confirmed.')
            ->modalSubmitActionLabel('Approve & promote')
            ->action(function (ContactInquiry $record): void {
                $approver = auth()->user();
                abort_unless($approver instanceof User, 403);

                try {
                    $uid = app(PromoteContactLead::class)->handle($record, $approver);
                    Notification::make()->success()->title('Promoted to Sniper Hub')->body($uid)->send();
                } catch (ValidationException $exception) {
                    Notification::make()->danger()->persistent()->title('Sniper Hub refused the lead')
                        ->body(collect($exception->errors())->flatten()->map(fn (mixed $message): string => e((string) $message))->implode(' '))->send();
                } catch (DomainException|RuntimeException $exception) {
                    Notification::make()->danger()->persistent()->title('Lead remains pending')
                        ->body($exception->getMessage())->send();
                }
            });
    }
}
