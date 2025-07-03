<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\User;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'slug',
        'user_id',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function generateSlug()
    {
        if (!$this->slug) {
            $this->slug = Str::slug($this->title);
        }
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            $post->generateSlug();
        });

        static::updating(function ($post) {
            $post->generateSlug();
        });
    }
}
