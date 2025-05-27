'use client';

import { useEffect, useState, useMemo } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  department: string;
  rating: number;
  role: string;  // Changed from optional to required
}

const DEPARTMENTS = ['HR', 'Engineering', 'Sales', 'Marketing', 'Support'];

function randomDept() {
  return DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
}

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();
      const generated = data.users.map((u: any) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        age: u.age,
        phone: u.phone,
        department: randomDept(),
        rating: Math.floor(Math.random() * 5) + 1,
        role: 'Employee', // always assign a string role
      }));
      setUsers(generated);
    }
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = selectedDept ? user.department === selectedDept : true;
      const matchesRating = selectedRating ? user.rating === selectedRating : true;

      return matchesSearch && matchesDept && matchesRating;
    });
  }, [users, searchTerm, selectedDept, selectedRating]);

  return {
    users: filteredUsers,
    allUsers: users,
    searchTerm,
    setSearchTerm,
    selectedDept,
    setSelectedDept,
    selectedRating,
    setSelectedRating,
  };
}
