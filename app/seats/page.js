"use client";

import { useState } from "react";

export default function Seats() {

  const [selectedSeat, setSelectedSeat] = useState(null);

  const seats = Array.from({ length: 12 }, (_, i) => i + 1);

  const bookedSeats = [3, 7];

  return (
    <main className="min-h-screen flex flex-col items-center p-10">

      <h1 className="text-3xl font-bold mb-8">Select Your Seat</h1>

      <div className="grid grid-cols-4 gap-4">

        {seats.map((seat) => {

          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeat === seat;

          return (
            <button
              key={seat}
              disabled={isBooked}
              onClick={() => setSelectedSeat(seat)}
              className={`w-12 h-12 rounded text-white
                ${isBooked ? "bg-red-500" :
                isSelected ? "bg-yellow-500" :
                "bg-green-500"}
              `}
            >
              {seat}
            </button>
          );
        })}

      </div>

      <a
        href="/passenger"
        className="mt-10 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Continue
      </a>

    </main>
  );
}