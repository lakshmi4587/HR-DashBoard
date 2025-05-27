'use client';
import React from 'react';

interface FilterBarProps {
  departments: string[];
  ratings: number[];
  selectedDept: string;
  selectedRating: number;
  onDeptChange: (dept: string) => void;
  onRatingChange: (rating: number) => void;
}

export default function FilterBar({
  departments,
  ratings,
  selectedDept,
  selectedRating,
  onDeptChange,
  onRatingChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      <select
        value={selectedDept}
        onChange={(e) => onDeptChange(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        value={selectedRating}
        onChange={(e) => onRatingChange(Number(e.target.value))}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl"
      >
        <option value={0}>All Ratings</option>
        {ratings.map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>
    </div>
  );
}
