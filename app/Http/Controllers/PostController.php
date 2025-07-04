<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('status')) {
            $query->where('is_published', $request->status === 'published');
        }

        $posts = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'filters' => $request->only(['search', 'status']),
        ]);
    }


    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request)
    { 
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = new Post();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->user_id = auth()->id();
        $post->is_published = $request->has('is_published') ? true : false;
        $post->save();

        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    public function show($id)
    {
        $post = Post::with('user')->findOrFail($id);
        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'nullable|boolean',
        ]);
    
        $post = Post::findOrFail($id);
    
        $post->fill([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'is_published' => $request->boolean('is_published'),
            'user_id' => auth()->id(), // Optional: if you want to track who updated it
        ])->save();
    
        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
    }
    

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }
}
