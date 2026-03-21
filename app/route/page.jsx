"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoutePage() {
  const router = useRouter();

  const [route, setRoute] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleNext = () => {
    if (!route || !date || !time) {
      alert("Please select route, date, and time");
      return;
    }

    router.push(`/booking?route=${route}&date=${date}&time=${time}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-white text-white">

      <h1 className="text-3xl font-bold">Select Your Trip</h1>

      {/* ROUTE */}
      <select
        className="p-2 rounded text-black w-64"
        onChange={(e) => setRoute(e.target.value)}
      >
        <option value="">Select Route</option>
        <option value="Colombo-Kandy">Colombo → Kandy</option>
        <option value="Colombo-Galle">Colombo → Galle</option>
        <option value="Kandy-Jaffna">Kandy → Jaffna</option>
      </select>

      {/* DATE */}
      <input
        type="date"
        className="p-2 rounded text-black w-64"
        onChange={(e) => setDate(e.target.value)}
      />

      {/* TIME */}
      <select
        className="p-2 rounded text-black w-64"
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">Select Time</option>
        <option value="08:00 AM">08:00 AM</option>
        <option value="12:00 PM">12:00 PM</option>
        <option value="06:00 PM">06:00 PM</option>
      </select>

      <button
        onClick={handleNext}
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
      >
        Continue to Seat Selection
      </button>

    </div>
  );
}