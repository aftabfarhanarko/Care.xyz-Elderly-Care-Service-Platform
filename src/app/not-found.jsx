import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-200">
      <h1 className="text-6xl font-bold text-rose-600 dark:text-rose-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been removed or doesn't exist.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
      >
        Return Home
      </Link>
    </div>
  );
}
