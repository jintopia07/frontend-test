'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UsersGrouped() {
  const [departmentData, setDepartmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from our API route
    setLoading(true);
    fetch('/api/summary')
      .then((res) => res.json())
      .then((data) => {
        setDepartmentData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold">Users Grouped by Department</h1>
          <p className="mt-2">Data transformed from DummyJSON API</p>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Interactive Fruit/Vegetable
          </Link>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Users Grouped by Department</h2>
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div>
              <div className="mb-4 text-sm text-gray-600">
                <p>Data has been transformed to group users by department according to the requirements:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>Count of males and females</li>
                  <li>Age range</li>
                  <li>Hair color summary</li>
                  <li>Address mapping (firstName+lastName: postalCode)</li>
                </ul>
              </div>
              <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-100">
                {JSON.stringify(departmentData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Department Dashboard | Data from DummyJSON API</p>
        </div>
      </footer>
    </div>
  );
}
