'use client';
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  rating: number;
  // performance:number;
}

interface BookmarkContextType {
  bookmarks: User[];
  toggleBookmark: (user: User) => void;
  isBookmarked: (id: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<User[]>([]);

  const toggleBookmark = (user: User) => {
    setBookmarks((prev) => {
      const exists = prev.find((u) => u.id === user.id);
      if (exists) {
        // Remove bookmark
        return prev.filter((u) => u.id !== user.id);
      } else {
        // Add bookmark
        return [...prev, user];
      }
    });
  };

  const isBookmarked = (id: number) => bookmarks.some((user) => user.id === id);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
