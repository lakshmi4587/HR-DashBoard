// UserPage.tsx (or .jsx)
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserView from '@/components/UserView';

const DEPARTMENTS = ['HR', 'Engineering', 'Sales', 'Marketing', 'Support'];
const ROLES = ['Software Engineer', 'HR Manager', 'Sales Executive', 'Marketing Lead', 'Support Agent'];

const PROJECTS_POOL = [
  'Employee Onboarding System',
  'CRM Integration',
  'Performance Review Tool',
  'Mobile App Redesign',
  'Website Migration',
  'Automation of Payroll',
  'Customer Feedback Analysis',
  'Cloud Infrastructure Setup',
  'Security Audit',
  'Marketing Campaign Launch',
];

const FEEDBACK_POOL = [
  'Great team player and communicator.',
  'Delivered the project ahead of schedule.',
  'Needs to improve time management skills.',
  'Excellent problem-solving skills.',
  'Proactive and self-motivated.',
  'Can work better under pressure.',
  'Shows leadership potential.',
  'Requires more attention to detail.',
  'Consistently meets deadlines.',
  'Shows great initiative.',
];

const PERFORMANCE_LABELS = ['Excellent', 'Good', 'Average', 'Poor', 'Bad'];
const QUARTERS = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'];

function randomDept(seed: number) {
  return DEPARTMENTS[seed % DEPARTMENTS.length];
}

function randomRole(seed: number) {
  return ROLES[seed % ROLES.length];
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generatePerformanceHistory(userId: number) {
  return QUARTERS.map((quarter, idx) => {
    const randIndex = Math.floor(seededRandom(userId * 10 + idx) * PERFORMANCE_LABELS.length);
    return `${quarter} - ${PERFORMANCE_LABELS[randIndex]}`;
  });
}

function generateProjects(userId: number) {
  const projects: string[] = [];
  const index = userId % PROJECTS_POOL.length; // Changed to const
  for (let i = 0; i < 3; i++) {
    projects.push(PROJECTS_POOL[(index + i) % PROJECTS_POOL.length]);
  }
  return projects;
}

function generateFeedback(userId: number) {
  const feedback: string[] = [];
  const index = (userId * 3) % FEEDBACK_POOL.length; // Changed to const
  for (let i = 0; i < 3; i++) {
    feedback.push(FEEDBACK_POOL[(index + i) % FEEDBACK_POOL.length]);
  }
  return feedback;
}

interface User {
  id: number;
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
  projects: string[];
  feedback: string[];
}

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null); // Typed user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();

      const userId = data.id;

      setUser({
        id: userId,
        name: `${data.firstName} ${data.lastName}`,
        role: randomRole(userId),
        email: data.email,
        phone: data.phone,
        age: data.age,
        department: randomDept(userId),
        rating: Math.floor(seededRandom(userId + 5) * 5) + 1,
        address: `${data.address.address}, ${data.address.city}`,
        bio: data.company?.title || 'No bio available',
        performanceHistory: generatePerformanceHistory(userId),
        projects: generateProjects(userId),
        feedback: generateFeedback(userId),
      });

      setLoading(false);
    }

    if (id) fetchUser();
  }, [id]);

  if (loading) return <div className="p-4">Loading user...</div>;
  if (!user) return <div className="p-4 text-red-500">User not found.</div>;

  return (
    <UserView
      {...user}
      bookmarked={false}
      onBookmark={() => {}}
      onPromote={() => {}}
    />
  );
}
