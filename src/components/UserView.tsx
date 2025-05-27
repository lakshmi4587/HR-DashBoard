'use client';
import React, { useState } from 'react';
import { Mail, Phone, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserViewProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  rating: number;
  address: string;
  bio: string;
  performanceHistory: string[];
  bookmarked: boolean;
  projects: string[];
  feedback: string[];
  onBookmark: () => void;
  onPromote: () => void;
}

export default function UserView({
  name,
  role,
  email,
  phone,
  age,
  department,
  rating,
  address,
  bio,
  performanceHistory,
  bookmarked,
  projects,
  feedback,
  onBookmark,
  onPromote,
}: UserViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'feedback'>('overview');

  const getRatingFromLabel = (label: string): number => {
    const map: { [key: string]: number } = {
      Excellent: 5,
      Good: 4,
      Average: 3,
      Poor: 2,
      Bad: 1,
    };
    return map[label] || 3;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans bg-blue-50 min-h-screen text-gray-800">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push('/')}
          className="text-sm bg-green-500 text-white px-4 py-1.5 rounded-full hover:bg-green-600 transition"
        >
          ← Back to Dashboard
        </button>
        <div className="flex gap-3">
          <button
            onClick={onBookmark}
            className={`text-sm px-4 py-1.5 rounded-full transition ${
              bookmarked
                ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                : 'border border-yellow-400 text-yellow-500 hover:bg-yellow-100'
            }`}
          >
            {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
          <button
            onClick={onPromote}
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition"
          >
            🚀 Promote
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition mb-6">
        <div className="flex items-start gap-6">
          <div className="relative w-30 h-30 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-md">
            {name[0]}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-gray-500 text-sm mb-1">{role}</p>
              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-2">
                {department}
              </span>
              <div className="flex flex-col text-sm text-gray-700 gap-1">
                <div className="flex gap-2 items-center">
                  <Mail size={16} /> {email}
                </div>
                <div className="flex gap-2 items-center">
                  <Phone size={16} /> {phone}
                </div>
                <div>Address: {address}</div>
                <div>Age: {age}</div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-gray-50 p-4 rounded-xl border shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Performance Rating</h3>
              <div className="flex items-center gap-1 text-yellow-400 text-lg">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    fill={i < rating ? '#facc15' : 'none'}
                    stroke="#facc15"
                    size={20}
                  />
                ))}
                <span className="text-gray-600 text-sm ml-2">{rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 text-sm font-medium text-gray-600 border-b pb-2 mb-6">
        {['overview', 'projects', 'feedback'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`relative pb-1 ${
              activeTab === tab
                ? 'text-blue-600 font-semibold'
                : 'hover:text-blue-500 text-gray-500'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          <div className="bg-white p-5 rounded-xl shadow mb-6">
            <h3 className="text-lg font-semibold mb-2">🧬 Bio</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">📈 Performance History</h3>
            <ul className="grid gap-4">
              {performanceHistory.map((entry, index) => {
                const [quarter, label] = entry.split(' - ');
                const stars = getRatingFromLabel(label);
                return (
                  <li key={index} className="bg-gray-50 rounded-xl p-4 border shadow-sm flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{quarter}</p>
                      <p className="text-gray-500 text-xs">{label}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          fill={i < stars ? '#facc15' : 'none'}
                          stroke="#facc15"
                          size={18}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">{stars}/5</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow">
              <h4 className="text-sm font-semibold text-blue-600 mb-1">{project}</h4>
              <p className="text-xs text-gray-500">
                Contributed as a key team member to deliver milestones effectively.
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedback.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow">
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
