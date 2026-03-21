"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoutePage() {
  const router = useRouter();

  const [schedules, setSchedules] = useState([]);

  const [route, setRoute] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await fetch("/api/schedule");
      const data = await res.json();
      setSchedules(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Unique routes
  const routes = [...new Set(schedules.map((s) => s.route))];

  // 🔥 Dates based on route
  const dates = [
    ...new Set(
      schedules
        .filter((s) => s.route === route)
        .map((s) => s.date)
    ),
  ];

  // 🔥 Times based on route + date
  const times = schedules
    .filter((s) => s.route === route && s.date === date)
    .map((s) => s.time);

  const handleNext = () => {
    if (!route || !date || !time) {
      alert("Please select route, date, and time");
      return;
    }

    const selected = schedules.find(
      (s) =>
        s.route === route &&
        s.date === date &&
        s.time === time
    );

    const params = new URLSearchParams({
      route,
      date,
      time,
      scheduleId: selected._id, // 🔥 IMPORTANT
    });

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-white text-gray-900">
      <h1 className="text-3xl font-bold">Select Your Trip</h1>

      {/* 🔹 ROUTE */}
      <select
        className="p-2 rounded border w-64"
        value={route}
        onChange={(e) => {
          setRoute(e.target.value);
          setDate("");
          setTime("");
        }}
      >
        <option value="">Select Route</option>
        {routes.map((r, index) => (
          <option key={index} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* 🔹 DATE */}
      <select
        className="p-2 rounded border w-64"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setTime("");
        }}
        disabled={!route}
      >
        <option value="">Select Date</option>
        {dates.map((d, index) => (
          <option key={index} value={d}>
            {d}
          </option>
        ))}
      </select>

      {/* 🔹 TIME */}
      <select
        className="p-2 rounded border w-64"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        disabled={!date}
      >
        <option value="">Select Time</option>
        {times.map((t, index) => (
          <option key={index} value={t}>
            {t}
          </option>
        ))}
      </select>

      <button
        onClick={handleNext}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Continue to Seat Selection
      </button>
    </div>
  );
}