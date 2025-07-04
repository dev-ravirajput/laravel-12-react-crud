import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Post {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  user: {
    id: number;
    name: string;
  };
}

export default function PostView() {
  const { post } = usePage<{ post: Post }>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Posts',
      href: '/posts',
    },
    {
      title: `View: ${post.title}`,
      href: `/posts/${post.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`View Post - ${post.title}`} />
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">View Post</h1>
          <Link
            href="/posts"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Posts
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6 border border-gray-300 dark:border-gray-600">
          {/* Title */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</h2>
            <p className="text-lg text-gray-900 dark:text-white">{post.title}</p>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</h2>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.content}</p>
          </div>

          {/* Author */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</h2>
            <p className="text-gray-800 dark:text-gray-200">{post.user.name}</p>
          </div>

          {/* Published */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Published</h2>
            {post.is_published ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Yes
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                No
              </span>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
