'use client';

import Link from 'next/link';
import logout from '@/app/_actions/logout';

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-blue-600 text-xl font-bold">Student System</h1>
      <div className="space-x-4">
        <Link href="/" className="text-blue-500">Home</Link>
        <form action={logout} className="inline">
          <button type="submit" className="text-sm text-gray-600 hover:underline">
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
