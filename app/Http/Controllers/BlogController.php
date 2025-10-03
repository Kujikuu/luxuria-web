<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');

        $blogs = Blog::with('author')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('about', 'like', "%{$search}%")
                      ->orWhereHas('author', function ($authorQuery) use ($search) {
                          $authorQuery->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->where('publish_date', '<=', now())
            ->orderBy('publish_date', 'desc')
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('Blog/Index', [
            'blogs' => $blogs,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function show(Request $request, string $slug)
    {
        $blog = Blog::with('author')
            ->where('slug', $slug)
            ->where('publish_date', '<=', now())
            ->firstOrFail();

        // Get 3 related blogs (excluding current blog)
        $relatedBlogs = Blog::with('author')
            ->where('id', '!=', $blog->id)
            ->where('publish_date', '<=', now())
            ->orderBy('publish_date', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
        ]);
    }
}
