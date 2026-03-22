"use client";

import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/book");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function loadBookings() {
      try {
        const res = await fetch("/api/book");
        const data = await res.json();

        if (!cancelled) {
          setBookings(data.bookings || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching bookings:", err);
          setBookings([]);
        }
      }
    }

    loadBookings();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Cancel this booking?")) return;

    try {
      const res = await fetch(`/api/book/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Booking cancelled");
        fetchBookings();
        return;
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      alert(data?.message || data?.error || "Failed to cancel booking");
    } catch (err) {
      console.error(err);
      alert("Error cancelling booking");
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    `${booking.name} ${booking.route}`.toLowerCase().includes(search.toLowerCase())
  );

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
    <h1 className="text-3xl font-bold mb-8 text-center">
      All Bookings
    </h1>

    {/* 🔹 Search */}
    <div className="max-w-5xl mx-auto mb-6">
      <input
        type="text"
        placeholder="Search by name or route..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 w-full md:w-1/3 rounded bg-white/20 border border-gray-300 text-white"
      />
    </div>

    {/* 🔹 Table */}
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl max-w-5xl mx-auto shadow-lg">
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-500">
          <thead className="bg-white/20">
            <tr>
              <th className="p-3 border">Booking ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Route</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Seats</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-gray-600 hover:bg-white/10 transition"
                >
                  <td className="p-3">
                    {booking.bookingId || booking._id}
                  </td>
                  <td className="p-3">{booking.name}</td>
                  <td className="p-3">{booking.phone}</td>
                  <td className="p-3">{booking.route}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className="p-3">{booking.time}</td>

                  <td className="p-3">
                    {Array.isArray(booking.seats)
                      ? booking.seats.join(", ")
                      : booking.seatNumber || "-"}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);
}
