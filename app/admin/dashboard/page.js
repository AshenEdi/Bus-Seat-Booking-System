"use client";

import { useState } from "react";

export default function AdminDashboard() {

  const [route, setRoute] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAddSchedule = async () => {

  const res = await fetch("/api/routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      route,
      date,
      time,
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Schedule added successfully!");
    setRoute("");
    setDate("");
    setTime("");
  } else {
    alert("Error adding schedule");
  }

};

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="flex flex-col gap-4 w-80">

        <input
          type="text"
          placeholder="Route (e.g. Colombo → Kandy)"
          className="border p-2 rounded"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="border p-2 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button
          onClick={handleAddSchedule}
          className="bg-green-600 text-white p-2 rounded"
        >
          Add Schedule
        </button>

      </div>

    </main>
  );
}