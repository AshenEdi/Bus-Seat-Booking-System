"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalSchedules, setTotalSchedules] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 🔹 Get bookings
      const bookingsRes = await fetch("/api/book");
      const bookingsData = await bookingsRes.json();
      setTotalBookings(bookingsData.length);

      // 🔹 Get schedules
      const scheduleRes = await fetch("/api/schedule");
      const scheduleData = await scheduleRes.json();
      setTotalSchedules(scheduleData.length);
    } catch (err) {
      console.error("Error loading dashboard:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* 🔥 Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <h2 className="text-gray-400 text-lg">
            Total Bookings
          </h2>
          <p className="text-4xl font-bold mt-2">
            {totalBookings}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <h2 className="text-gray-400 text-lg">
            Total Schedules
          </h2>
          <p className="text-4xl font-bold mt-2">
            {totalSchedules}
          </p>
        </div>
      </div>

      {/* 🔹 Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedules */}
        <a
          href="/admin/schedules"
          className="bg-purple-600 hover:bg-purple-700 p-6 rounded-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Manage Schedules
          </h2>
          <p className="text-sm text-gray-200">
            Add, view, and delete bus schedules
          </p>
        </a>

        {/* Bookings */}
        <a
          href="/admin/bookings"
          className="bg-blue-600 hover:bg-blue-700 p-6 rounded-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            View Bookings
          </h2>
          <p className="text-sm text-gray-200">
            See all bookings and cancel seats
          </p>
        </a>
      </div>
    </div>
  );
}