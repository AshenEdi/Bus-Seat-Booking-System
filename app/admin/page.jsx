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
      const bookingsRes = await fetch("/api/book");
      const bookingsData = await bookingsRes.json();
      setTotalBookings(bookingsData.bookings?.length || bookingsData.length || 0);

      const scheduleRes = await fetch("/api/schedule");
      const scheduleData = await scheduleRes.json();
      setTotalSchedules(scheduleData.length || 0);
    } catch (err) {
      console.error("Error loading dashboard:", err);
    }
  };

  return (
    <div
      className="min-h-screen p-6 text-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
          url('/images/bus-wall.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-10 text-center">
        Admin Dashboard
      </h1>

      {/* 🔥 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
        
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-gray-300 text-lg">
            Total Schedules
          </h2>
          <p className="text-5xl font-bold mt-2 text-green-400">
            {totalSchedules}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-gray-300 text-lg">
            Total Bookings
          </h2>
          <p className="text-5xl font-bold mt-2 text-blue-400">
           {totalBookings} 
          </p>
        </div>

      </div>

      {/* 🔹 Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {/* Schedules */}
        <a
          href="/admin/schedules"
          className="bg-purple-600/80 backdrop-blur p-6 rounded-2xl hover:bg-purple-700 transition shadow-lg"
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
          className="bg-blue-600/80 backdrop-blur p-6 rounded-2xl hover:bg-blue-700 transition shadow-lg"
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