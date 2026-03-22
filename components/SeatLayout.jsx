"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Seat from "./Seats";

export default function SeatLayout({
  route,
  date,
  time,
  mode = "user",
  disabledSeats = [],
  setDisabledSeats = () => {},
}) {
  const router = useRouter();
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userDisabledSeats, setUserDisabledSeats] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rows = 5;
  const activeDisabledSeats = mode === "admin" ? disabledSeats : userDisabledSeats;

  useEffect(() => {
    let cancelled = false;

    async function loadSeatState() {
      if (!route || !date || !time) return;

      try {
        const params = new URLSearchParams({ route, date, time });
        const [bookingsRes, schedulesRes] = await Promise.all([
          fetch(`/api/book?${params.toString()}`),
          fetch(`/api/schedule?${params.toString()}`),
        ]);
        const [bookingsData, schedulesData] = await Promise.all([
          bookingsRes.json(),
          schedulesRes.json(),
        ]);

        if (!bookingsRes.ok || !bookingsData.success) {
          throw new Error(
            bookingsData.error || bookingsData.message || "Failed to load booked seats"
          );
        }

        if (!schedulesRes.ok || !Array.isArray(schedulesData)) {
          throw new Error("Failed to load disabled seats");
        }

        if (!cancelled) {
          const seats = bookingsData.bookings.flatMap((booking) => booking.seats || []);
          const scheduleDisabledSeats =
            schedulesData[0]?.disabledSeats?.filter((seat) => Number.isInteger(seat)) || [];

          setBookedSeats(seats);

          if (mode !== "admin") {
            setUserDisabledSeats(scheduleDisabledSeats);
            setSelectedSeats((prev) =>
              prev.filter(
                (seat) =>
                  !seats.includes(seat) && !scheduleDisabledSeats.includes(seat)
              )
            );
          }
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching seats:", error);
        }
      }
    }

    loadSeatState();

    return () => {
      cancelled = true;
    };
  }, [route, date, time, mode]);

  const handleSelect = (seatNumber) => {
    if (mode === "admin") {
      if (activeDisabledSeats.includes(seatNumber)) {
        setDisabledSeats(activeDisabledSeats.filter((seat) => seat !== seatNumber));
      } else {
        setDisabledSeats([...activeDisabledSeats, seatNumber]);
      }
      return;
    }

    if (
      bookedSeats.includes(seatNumber) ||
      activeDisabledSeats.includes(seatNumber)
    ) {
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

    if (isSubmitting) return;

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
      <h2 className="text-2xl font-bold text-white">
        {mode === "admin" ? "Manage Seats" : "Select Your Seats"}
      </h2>

      {mode !== "admin" && (
        <div className="text-center text-white">
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
      )}

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const base = rowIndex * 4;

          return (
            <div key={rowIndex} className="flex items-center gap-6 mb-4">
              <div className="flex gap-2">
                {[1, 2].map((n) => {
                  const seatNum = base + n;
                  const isDisabled = activeDisabledSeats.includes(seatNum);
                  const isBooked = bookedSeats.includes(seatNum);

                  return (
                    <Seat
                      key={seatNum}
                      number={seatNum}
                      status={isDisabled ? "disabled" : isBooked ? "booked" : "available"}
                      onSelect={handleSelect}
                      isSelected={selectedSeats.includes(seatNum)}
                      isLocked={mode !== "admin" && (isBooked || isDisabled)}
                    />
                  );
                })}
              </div>

              <div className="w-8" />

              <div className="flex gap-2">
                {[3, 4].map((n) => {
                  const seatNum = base + n;
                  const isDisabled = activeDisabledSeats.includes(seatNum);
                  const isBooked = bookedSeats.includes(seatNum);

                  return (
                    <Seat
                      key={seatNum}
                      number={seatNum}
                      status={isDisabled ? "disabled" : isBooked ? "booked" : "available"}
                      onSelect={handleSelect}
                      isSelected={selectedSeats.includes(seatNum)}
                      isLocked={mode !== "admin" && (isBooked || isDisabled)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {mode !== "admin" && activeDisabledSeats.length > 0 && (
        <p className="text-sm text-gray-300">
          Gray seats are disabled and cannot be selected.
        </p>
      )}

      {mode !== "admin" && selectedSeats.length > 0 && (
        <>
          <p className="text-lg text-white">
            Selected Seats: <b>{selectedSeats.join(", ")}</b>
          </p>

          <div className="flex flex-col gap-3 mt-4 w-64 text-white">
            <input
              type="text"
              placeholder="Enter Name"
              className="p-2 rounded border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter Phone"
              className="p-2 rounded border"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;

                // 🔥 allow only numbers
                if (/^\d*$/.test(value)) {
                  setPhone(value);
                }
              }}
            />

            <button
              onClick={handleBooking}
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-60"
            >
              {isSubmitting ? "Booking..." : "Book Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
