'use client';

import React from 'react';
import { useBookmarks } from '@/context/BookmarkContext';
import UserCard from '@/components/UserCard';
import { useRouter } from 'next/navigation';

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/users/${id}`);
  };

  const handlePromote = (user: any) => {
    alert(`Promote ${user.name} (functionality not implemented)`);
  };

  const totalEmployees = 20;
  const bookmarkedCount = bookmarks.length;

  const averageRating = bookmarkedCount
    ? (bookmarks.reduce((sum, user) => sum + user.rating, 0) / bookmarkedCount).toFixed(1)
    : '0.0';

  if (bookmarks.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">No bookmarks yet.</div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-blue-100 min-h-screen">
      {/* Header */}
      <div className="text-center">
  <h1 className="text-3xl font-bold text-orange-400 inline-flex items-center justify-center gap-2">
    <span>🔖</span> Bookmarked Employees
  </h1>
  <p className="text-gray-500 mt-1">
    Manage your saved team members and quick actions
  </p>
</div>


      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20h6M4 20h5v-2a3 3 0 00-5.356-1.857M15 11a3 3 0 11-6 0 3 3 0 016 0zm7-5a3 3 0 11-6 0 3 3 0 016 0zm-14 0a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{bookmarkedCount} Bookmarked</h2>
            <p className="text-gray-500">Out of {totalEmployees} total employees</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm">Average Rating</p>
          <p className="text-2xl font-bold">{averageRating}/5</p>
        </div>
      </div>

      {/* Bookmarked Members */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Bookmarked Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              bookmarked={isBookmarked(user.id)}
              onView={handleView}
              onBookmark={() => toggleBookmark(user)}
              onPromote={() => handlePromote(user)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
