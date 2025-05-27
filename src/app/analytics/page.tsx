'use client';

import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type User = {
  id: number;
  firstName: string;
  lastName: string;
  company: { department: string };
  rating: number;  // We'll mock rating since API doesn't provide it
  bookmarked?: boolean; // we'll mock this
};

const departmentsList = ['HR', 'Engineering', 'Sales', 'Marketing', 'Support'];

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://dummyjson.com/users?limit=20');
        const data = await res.json();

        // Map users with mocked rating and bookmarked status
        const usersWithExtras: User[] = data.users.map((u: any, i: number) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          company: {
            department: departmentsList[i % departmentsList.length], // assign departments cyclically
          },
          rating: +(Math.random() * 5).toFixed(1), // random rating between 0-5
          bookmarked: Math.random() > 0.7, // 30% chance bookmarked
        }));

        setUsers(usersWithExtras);
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p className="p-8">Loading data...</p>;

  // Group users by department
  const groupedByDept = departmentsList.map((dept) => {
    const deptUsers = users.filter((u) => u.company.department === dept);
    const employees = deptUsers.length;
    const avgRating =
      employees === 0
        ? 0
        : deptUsers.reduce((acc, u) => acc + u.rating, 0) / employees;
    const bookmarked = deptUsers.filter((u) => u.bookmarked).length;
    const bookmarkedRate = employees ? ((bookmarked / employees) * 100).toFixed(1) : '0.0';
    return { department: dept, employees, avgRating, bookmarked, bookmarkedRate };
  });

  // Department-wise avg rating chart data
  const departmentRatingData = {
    labels: departmentsList,
    datasets: [
      {
        label: 'Avg Rating',
        data: groupedByDept.map((d) => +d.avgRating.toFixed(2)),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  // Bookmark trend - MOCKED (can be replaced with real trend if available)
  const bookmarkTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Bookmarks',
        data: [3, 5, 2, 8, 6, 9, 10],
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className="p-8 bg-blue-100 dark:bg-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-700 dark:text-purple-400">
  Analytics Dashboard
</h1>


      {/* Charts side by side */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Department-wise Average Ratings
          </h2>
          <Bar
            data={departmentRatingData}
            options={{
              scales: {
                y: {
                  min: 0,
                  max: 5,
                  ticks: { stepSize: 1 },
                },
              },
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: false },
              },
            }}
          />
        </div>

        <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Bookmark Trends (Mocked)
          </h2>
          <Line
            data={bookmarkTrendData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: false },
              },
            }}
          />
        </div>
      </div>

      {/* Department Analytics Summary Table */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          Department Analytics Summary
        </h2>
        <table className="min-w-full border-collapse text-gray-800 dark:text-white">
          <thead>
            <tr>
              <th className="border-b border-gray-400 p-3 text-left">Department</th>
              <th className="border-b border-gray-400 p-3 text-right">Employees</th>
              <th className="border-b border-gray-400 p-3 text-right">Avg Rating</th>
              <th className="border-b border-gray-400 p-3 text-right">Bookmarked</th>
              <th className="border-b border-gray-400 p-3 text-right">Bookmarked Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {groupedByDept.map((d) => (
              <tr key={d.department} className="even:bg-gray-200 dark:even:bg-gray-600">
                <td className="p-3">{d.department}</td>
                <td className="p-3 text-right">{d.employees}</td>
                <td className="p-3 text-right">{d.avgRating.toFixed(2)}</td>
                <td className="p-3 text-right">{d.bookmarked}</td>
                <td className="p-3 text-right">{d.bookmarkedRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
