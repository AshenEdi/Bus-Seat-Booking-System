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

    const params = new URLSearchParams({ route, date, time });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-white text-gray-900">
      <h1 className="text-3xl font-bold">Select Your Trip</h1>

      <select
        className="p-2 rounded border w-64"
        value={route}
        onChange={(event) => setRoute(event.target.value)}
      >
        <option value="">Select Route</option>
        <option value="Colombo-Kandy">Colombo to Kandy</option>
        <option value="Colombo-Galle">Colombo to Galle</option>
        <option value="Kandy-Jaffna">Kandy to Jaffna</option>
      </select>

      <input
        type="date"
        className="p-2 rounded border w-64"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <select
        className="p-2 rounded border w-64"
        value={time}
        onChange={(event) => setTime(event.target.value)}
      >
        <option value="">Select Time</option>
        <option value="08:00 AM">08:00 AM</option>
        <option value="12:00 PM">12:00 PM</option>
        <option value="06:00 PM">06:00 PM</option>
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
