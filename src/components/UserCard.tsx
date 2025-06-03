'use client';
import React, { useState } from 'react'; // ⬅️ Added useState
import { Mail, Phone, Bookmark, BookmarkCheck } from 'lucide-react';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  rating: number;
}

interface UserCardProps {
  user: User;
  bookmarked: boolean;
  onView: (id: number) => void;
  onBookmark: (user: User) => void;
  onPromote: () => void;
}

export default function UserCard({
  user,
  bookmarked,
  onView,
  onBookmark,
  onPromote,
}: UserCardProps) {
  const { id, name, role, email, phone, age, department } = user;

  const [rating, setRating] = useState(user.rating); // ⬅️ Track local rating

  const handlePromote = () => {
  if (rating >= 5) {
    alert('User already has the maximum rating!'); // Show a message
    return;
  }
  const newRating = Math.min(5, rating + 0.5);
  setRating(newRating);
  onPromote();
};

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-3 w-full max-w-sm dark:bg-gray-800">
      {/* Profile + Name */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-white">
          {name[0]}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div>
          <div className="font-semibold text-lg text-gray-800 dark:text-white">{name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
        </div>
      </div>

      {/* Department + Age */}
      <div className="flex items-center gap-3 text-sm">
        <span className="px-2 py-0.5 rounded-full text-white text-xs font-medium bg-blue-500">
          {department}
        </span>
        <span className="text-gray-500 dark:text-gray-400">Age {age}</span>
      </div>

      {/* Contact Info */}
      <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-gray-500 dark:text-gray-400" />
          {email}
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-gray-500 dark:text-gray-400" />
          {phone}
        </div>
      </div>

      {/* Performance */}
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Performance</div>
        <div className="flex items-center gap-1">
          {
            Array.from({ length: 5 }, (_, i) => {
              const full = i + 1 <= rating;
              const half = i + 0.5 === rating;
              return (
                <span key={i}>
                  {full ? '⭐' : half ? '⯪' : '☆'}
                </span>
              );
            })
          }
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{rating}/5</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          onClick={() => onView(id)}
        >
          View
        </button>

        <button
          className={`px-4 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
            bookmarked
              ? 'bg-yellow-400 text-white hover:bg-yellow-500'
              : 'border border-gray-300 hover:bg-yellow-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white'
          }`}
          onClick={() => onBookmark(user)}
        >
          {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          {bookmarked ? 'Saved' : 'Save'}
        </button>

        <button
          className="px-4 py-1.5 rounded-lg bg-green-500 text-white text-sm hover:bg-green-600"
          onClick={handlePromote} // ⬅️ Use local handler
        >
          Promote
        </button>
      </div>
    </div>
  );
}
