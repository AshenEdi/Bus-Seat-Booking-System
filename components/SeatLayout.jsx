"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Seat from "./Seats";

export default function SeatLayout({ route, date, time }) {
  const router = useRouter();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rows = 5;

  useEffect(() => {
    let cancelled = false;

    async function loadBookedSeats() {
      if (!route || !date || !time) {
        return;
      }

      try {
        const params = new URLSearchParams({ route, date, time });
        const res = await fetch(`/api/book?${params.toString()}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || data.message || "Failed to load booked seats");
        }

        if (!cancelled) {
          const seats = data.bookings.flatMap((booking) => booking.seats || []);
          setBookedSeats(seats);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching seats:", error);
        }
      }
    }

    loadBookedSeats();

    return () => {
      cancelled = true;
    };
  }, [route, date, time]);

  const handleSelect = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      }

      return [...prev, seatNumber];
    });
  };

  const handleBooking = async () => {
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (isSubmitting) {
      return;
    }

    if (!route || !date || !time) {
      alert("Missing route details. Please start from route selection.");
      return;
    }

    if (!cleanName || !cleanPhone || selectedSeats.length === 0) {
      alert("Please complete all details");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route,
          date,
          time,
          seats: selectedSeats,
          name: cleanName,
          phone: cleanPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Booking failed");
      }

      alert("Booking confirmed!");
      setBookedSeats((prev) => [...new Set([...prev, ...selectedSeats])]);
      setSelectedSeats([]);
      setName("");
      setPhone("");

      if (data.booking?._id) {
        router.push(`/confirmation?bookingId=${encodeURIComponent(data.booking._id)}`);
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold">Select Your Seats</h2>

      <div className="text-center">
        <p>
          <b>Route:</b> {route}
        </p>
        <p>
          <b>Date:</b> {date}
        </p>
        <p>
          <b>Time:</b> {time}
        </p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const base = rowIndex * 4;

          return (
            <div key={rowIndex} className="flex items-center gap-6 mb-4">
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

              <div className="w-8" />

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

      {selectedSeats.length > 0 && (
        <p className="text-lg">
          Selected Seats: <b>{selectedSeats.join(", ")}</b>
        </p>
      )}

      {selectedSeats.length > 0 && (
        <div className="flex flex-col gap-3 mt-4 w-64">
          <input
            type="text"
            placeholder="Enter Name"
            className="p-2 rounded border"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Phone"
            className="p-2 rounded border"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />

          <button
            onClick={handleBooking}
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Booking..." : "Book Now"}
          </button>
        </div>
      )}
    </div>
  );
}
