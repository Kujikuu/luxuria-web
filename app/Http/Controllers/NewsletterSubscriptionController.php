<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsletterSubscriptionRequest;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class NewsletterSubscriptionController extends Controller
{
    public function store(StoreNewsletterSubscriptionRequest $request): JsonResponse|RedirectResponse
    {
        $subscriber = NewsletterSubscriber::create($request->validated());
        $slug = (string) $request->route('slug');

        if ($slug !== '') {
            session(["blog_access_{$slug}" => now()->addDays(7)->timestamp]);
        }

        if ($request->expectsJson()) {
            return response()->json([
                'subscribed' => true,
                'subscriber' => [
                    'id' => $subscriber->id,
                    'email' => $subscriber->email,
                ],
            ], 201);
        }

        return redirect()->back();
    }
}
