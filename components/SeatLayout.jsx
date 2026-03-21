"use client";

import { useState } from "react";
import Seat from "./Seats"; 

export default function SeatLayout() {

  const [bookedSeats] = useState([2, 5, 9]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // ✅ MOVED INSIDE
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = () => {
    if (!name || !phone) {
      alert("Please enter name and phone");
      return;
    }

    const bookingData = {
      name,
      phone,
      seats: selectedSeats,
    };

    console.log("Booking:", bookingData);

    alert("Booking Confirmed!");

    setSelectedSeats([]);
    setName("");
    setPhone("");
  };

  const handleSelect = (seatNumber) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const rows = 5;

  return (
    <div className="flex flex-col items-center gap-6">

      <h2 className="text-2xl font-bold">🚌 Select Your Seats</h2>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">

        {Array.from({ length: rows }).map((_, rowIndex) => {
          const base = rowIndex * 4;

          return (
            <div key={rowIndex} className="flex items-center gap-6 mb-4">

              {/* LEFT */}
              <div className="flex gap-2">
                {[1, 2].map((n) => {
                  const seatNum = base + n;
                  return (
                    <Seat
                      key={seatNum}
                      number={seatNum}
                      status={bookedSeats.includes(seatNum) ? "booked" : "available"}
                      onSelect={handleSelect}
                      isSelected={selectedSeats.includes(seatNum)}
                    />
                  );
                })}
              </div>

              {/* AISLE */}
              <div className="w-8"></div>

              {/* RIGHT */}
              <div className="flex gap-2">
                {[3, 4].map((n) => {
                  const seatNum = base + n;
                  return (
                    <Seat
                      key={seatNum}
                      number={seatNum}
                      status={bookedSeats.includes(seatNum) ? "booked" : "available"}
                      onSelect={handleSelect}
                      isSelected={selectedSeats.includes(seatNum)}
                    />
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* Selected seats */}
      {selectedSeats.length > 0 && (
        <p className="text-lg">
          Selected Seats: <b>{selectedSeats.join(", ")}</b>
        </p>
      )}

      {/* Booking form */}
      {selectedSeats.length > 0 && (
        <div className="flex flex-col gap-3 mt-4 w-64">

          <input
            type="text"
            placeholder="Enter Name"
            className="p-2 rounded text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Phone"
            className="p-2 rounded text-black"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleBooking}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Book Now
          </button>

        </div>
      )}

    </div>
  );
}