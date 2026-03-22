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
  <div
    className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)),
        url('/images/bus-wall.jpg')
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Glass Card */}
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-[350px] text-white flex flex-col gap-4">

      <h1 className="text-2xl font-bold text-center mb-2">
        Select Your Trip
      </h1>

      {/* 🔹 ROUTE */}
      <div>
        <label className="text-sm mb-1 block">Route</label>
        <select
          className="p-2 rounded w-full bg-white/20 border border-gray-300 text-white"
          value={route}
          onChange={(e) => {
            setRoute(e.target.value);
            setDate("");
            setTime("");
          }}
        >
          <option value="" className="text-black">Select Route</option>
          {routes.map((r, index) => (
            <option key={index} value={r} className="text-black">
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 DATE */}
      <div>
        <label className="text-sm mb-1 block">Date</label>
        <select
          className="p-2 rounded w-full bg-white/20 border border-gray-300 text-white"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setTime("");
          }}
          disabled={!route}
        >
          <option value="" className="text-black">Select Date</option>
          {dates.map((d, index) => (
            <option key={index} value={d} className="text-black">
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 TIME */}
      <div>
        <label className="text-sm mb-1 block">Time</label>
        <select
          className="p-2 rounded w-full bg-white/20 border border-gray-300 text-white"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={!date}
        >
          <option value="" className="text-black">Select Time</option>
          {times.map((t, index) => (
            <option key={index} value={t} className="text-black">
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* 🔥 BUTTON */}
      <button
        onClick={handleNext}
        className="mt-4 bg-green-500 hover:bg-green-600 py-2 rounded-lg font-semibold transition"
      >
        Continue →
      </button>
    </div>
  </div>
);
}