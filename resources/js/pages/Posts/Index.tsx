import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Posts', href: '/posts' },
];

interface Post {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  user: { id: number; name: string };
}

export default function Posts() {
  const { posts, flash, filters } = usePage<{
    posts: { data: Post[]; links: any[] };
    flash: { success?: string; error?: string };
    filters: { search?: string; status?: string };
  }>().props;

  const [successMessage, setSuccessMessage] = useState(flash.success);
  const [errorMessage, setErrorMessage] = useState(flash.error);

  const { data, setData, get } = useForm({
    search: filters?.search || '',
    status: filters?.status || '',
  });

  const submit = () => {
    get('/posts', {
      preserveScroll: true,
      preserveState: true,
    });
  };

  useEffect(() => {
    if (flash.success) {
      const timeout = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [flash.success]);

  useEffect(() => {
    if (flash.error) {
      const timeout = setTimeout(() => setErrorMessage(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [flash.error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Posts" />
      <div className="container mx-auto p-4 sm:p-6">

        {successMessage && (
          <div className="mb-4 p-4 rounded bg-green-100 text-green-800 border border-green-300">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 rounded bg-red-100 text-red-800 border border-red-300">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Posts</h1>
          <Link
            href="/posts/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Create New Post
          </Link>
        </div>

        {/* Filter Section */}
        <div className="mb-4 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search title..."
            value={data.search}
            onChange={(e) => setData('search', e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full sm:w-64 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={data.status}
            onChange={(e) => setData('status', e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <button
            onClick={submit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Filter
          </button>
        </div>

        {posts.data.length === 0 ? (
          <div className="text-center py-12">
            <PlaceholderPattern className="mx-auto h-24 w-24 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No posts yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new post.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Published</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {posts.data.map((post: Post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{post.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{post.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">{post.content}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{post.user?.name ?? 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {post.is_published ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Yes</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link href={`/posts/${post.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 hover:underline">View</Link>
                        <Link href={`/posts/${post.id}/edit`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:underline">Edit</Link>
                        <Link
                          href={route('posts.destroy', post.id)}
                          method="delete"
                          as="button"
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:underline"
                          onClick={(e) => {
                            if (!confirm('Are you sure you want to delete this post?')) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-6 flex flex-wrap gap-2 p-2">
              {posts.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url ?? ''}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className={`px-3 py-1 text-sm border rounded ${
                    link.active
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
