'use client';
import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  filters: { department?: string; rating?: number };
  onClearFilters: () => void;
  onRemoveFilter: (key: 'department' | 'rating') => void;
  onSelectFilter: (key: 'department' | 'rating', value: string | number) => void;
}

const departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Support'];
const ratings = [1, 2, 3, 4, 5];

export default function SearchBar({
  value,
  onChange,
  filters,
  onClearFilters,
  onRemoveFilter,
  onSelectFilter,
}: SearchBarProps) {
  const [deptDropdown, setDeptDropdown] = useState(false);
  const [ratingDropdown, setRatingDropdown] = useState(false);

  return (
    <div className="space-y-2 p-4 bg-white rounded-xl shadow relative z-10">
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search employees by name, email, or department..."
        className="w-[1100px] px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap mt-2 relative">
        {/* Department Filter */}
        <div className="relative">
          <button
            className="flex items-center px-3 py-1 border rounded-lg border-gray-300 font-medium bg-white"
            onClick={() => setDeptDropdown(!deptDropdown)}
          >
            <span className="mr-2">🧩</span> Department
            <ChevronDown className="ml-1 w-4 h-4" />
          </button>
          {deptDropdown && (
            <ul className="absolute bg-white border rounded-lg shadow w-40 mt-2 z-10">
              {departments.map((dept) => (
                <li
                  key={dept}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    onSelectFilter('department', dept);
                    setDeptDropdown(false);
                  }}
                >
                  {dept}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <button
            className="flex items-center px-3 py-1 border rounded-lg border-gray-300 font-medium bg-white"
            onClick={() => setRatingDropdown(!ratingDropdown)}
          >
            <span className="mr-2">⭐</span> Rating
            <ChevronDown className="ml-1 w-4 h-4" />
          </button>
          {ratingDropdown && (
            <ul className="absolute bg-white border rounded-lg shadow w-40 mt-2 z-10">
              {ratings.map((rate) => (
                <li
                  key={rate}
                  className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                  onClick={() => {
                    onSelectFilter('rating', rate);
                    setRatingDropdown(false);
                  }}
                >
                  {rate} ⭐
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Clear Filters */}
        {(filters.department || filters.rating) && (
          <button onClick={onClearFilters} className="flex items-center text-red-500 ml-2">
            <X size={16} className="mr-1" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Tags */}
      <div className="flex gap-2 mt-2 flex-wrap">
        {filters.department && (
          <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm">
            {filters.department}
            <X size={16} className="ml-2 cursor-pointer" onClick={() => onRemoveFilter('department')} />
          </span>
        )}
        {filters.rating && (
          <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm">
            {filters.rating} ⭐
            <X size={16} className="ml-2 cursor-pointer" onClick={() => onRemoveFilter('rating')} />
          </span>
        )}
      </div>
    </div>
  );
}
