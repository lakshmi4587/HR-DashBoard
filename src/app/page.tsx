'use client';

import SearchBar from '@/components/SearchBar';
import useUsers from '@/hooks/useUsers';
import UserCard from '@/components/UserCard';
import { useRouter } from 'next/navigation';
import { useBookmarks } from '@/context/BookmarkContext';
import { Users, Bookmark, Star, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const {
    users,
    allUsers,
    searchTerm,
    setSearchTerm,
    selectedDept,
    setSelectedDept,
    selectedRating,
    setSelectedRating,
  } = useUsers();

  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  const totalEmployees = allUsers.length;

  const avgRating = totalEmployees
    ? (allUsers.reduce((sum, u) => sum + u.rating, 0) / totalEmployees).toFixed(1)
    : '0.0';

  const bookmarkedCount = bookmarks.length;

  const highPerformersCount = allUsers.filter((user) => user.rating === 5).length;

  return (
    <main className="px-6 py-4 bg-blue-100 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-white mb-6 text-center">
        Employee Performance Dashboard
      </h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Employees */}
        <div className="flex items-center justify-between p-5 bg-blue-50 rounded-2xl shadow-sm">
          <div>
            <p className="text-sm text-gray-600">Total Employees</p>
            <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Users className="text-white w-5 h-5" />
          </div>
        </div>

        {/* Average Rating */}
        <div className="flex items-center justify-between p-5 bg-yellow-50 rounded-2xl shadow-sm">
          <div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">{avgRating}/5</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">
            <Star className="text-white w-5 h-5" />
          </div>
        </div>

        {/* Bookmarked Employees */}
        <div className="flex items-center justify-between p-5 bg-purple-50 rounded-2xl shadow-sm">
          <div>
            <p className="text-sm text-gray-600">Bookmarked</p>
            <p className="text-2xl font-bold text-gray-900">{bookmarkedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
            <Bookmark className="text-white w-5 h-5" />
          </div>
        </div>

        {/* High Performers */}
        <div className="flex items-center justify-between p-5 bg-green-50 rounded-2xl shadow-sm">
          <div>
            <p className="text-sm text-gray-600">High Performers</p>
            <p className="text-2xl font-bold text-gray-900">{highPerformersCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bars */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          filters={{
            department: selectedDept || undefined,
            rating: selectedRating || undefined,
          }}
          onClearFilters={() => {
            setSelectedDept('');
            setSelectedRating(0);
          }}
          onRemoveFilter={(key) => {
            if (key === 'department') setSelectedDept('');
            if (key === 'rating') setSelectedRating(0);
          }}
          onSelectFilter={(key, value) => {
            if (key === 'department') setSelectedDept(value as string);
            if (key === 'rating') setSelectedRating(value as number);
          }}
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            bookmarked={isBookmarked(user.id)}
            onView={(id) => router.push(`/users/${id}`)}
            onBookmark={() => toggleBookmark(user)}
            onPromote={() => alert(`Promoted ${user.name}`)}
          />
        ))}
      </div>
    </main>
  );
}
