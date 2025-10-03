<?php

namespace App\Http\Controllers;

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
                        ->orWhere('title_ar', 'like', "%{$search}%")
                        ->orWhere('about', 'like', "%{$search}%")
                        ->orWhere('about_ar', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%")
                        ->orWhere('content_ar', 'like', "%{$search}%")
                        ->orWhereHas('author', function ($authorQuery) use ($search) {
                            $authorQuery->where('name', 'like', "%{$search}%")
                                ->orWhere('name_ar', 'like', "%{$search}%");
                        });
                });
            })
            ->where('publish_date', '<=', now())
            ->orderBy('publish_date', 'desc')
            ->paginate(7)
            ->withQueryString();

        // Format image URLs for frontend access
        $blogs->getCollection()->transform(function ($blog) {
            if ($blog->featured_image) {
                // Add /storage/ prefix only for local files (not full URLs)
                if (! str_starts_with($blog->featured_image, 'http://') && ! str_starts_with($blog->featured_image, 'https://')) {
                    $blog->featured_image = '/storage/'.$blog->featured_image; // Local file - add prefix
                }
            }
            if ($blog->author->image) {
                // Add /storage/ prefix only for local files (not full URLs)
                if (! str_starts_with($blog->author->image, 'http://') && ! str_starts_with($blog->author->image, 'https://')) {
                    $blog->author->image = '/storage/'.$blog->author->image; // Local file - add prefix
                }
            }

            return $blog;
        });

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

        // Format image URLs for frontend access
        if ($blog->featured_image) {
            // Add /storage/ prefix only for local files (not full URLs)
            if (! str_starts_with($blog->featured_image, 'http://') && ! str_starts_with($blog->featured_image, 'https://')) {
                $blog->featured_image = '/storage/'.$blog->featured_image;
            }
        }
        if ($blog->author->image) {
            // Add /storage/ prefix only for local files (not full URLs)
            if (! str_starts_with($blog->author->image, 'http://') && ! str_starts_with($blog->author->image, 'https://')) {
                $blog->author->image = '/storage/'.$blog->author->image;
            }
        }

        // Get 3 related blogs (excluding current blog)
        $relatedBlogs = Blog::with('author')
            ->where('id', '!=', $blog->id)
            ->where('publish_date', '<=', now())
            ->orderBy('publish_date', 'desc')
            ->limit(3)
            ->get();

        // Format image URLs for related blogs
        $relatedBlogs->transform(function ($relatedBlog) {
            if ($relatedBlog->featured_image) {
                // Add /storage/ prefix only for local files (not full URLs)
                if (! str_starts_with($relatedBlog->featured_image, 'http://') && ! str_starts_with($relatedBlog->featured_image, 'https://')) {
                    $relatedBlog->featured_image = '/storage/'.$relatedBlog->featured_image;
                }
            }
            if ($relatedBlog->author->image) {
                // Add /storage/ prefix only for local files (not full URLs)
                if (! str_starts_with($relatedBlog->author->image, 'http://') && ! str_starts_with($relatedBlog->author->image, 'https://')) {
                    $relatedBlog->author->image = '/storage/'.$relatedBlog->author->image;
                }
            }

            return $relatedBlog;
        });

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
        ]);
    }
}
