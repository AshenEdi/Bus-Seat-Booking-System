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
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      <input
        type="text"
        placeholder="Search by name or route..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 w-full md:w-1/3 rounded bg-gray-800 border border-gray-700"
      />

      <div className="bg-gray-900 p-4 rounded-lg">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 border">Booking ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Route</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Seats</th>
              <th className="p-2 border">Actions</th>
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
                <tr key={booking._id} className="border-t border-gray-700">
                  <td className="p-2">{booking.bookingId || booking._id}</td>
                  <td className="p-2">{booking.name}</td>
                  <td className="p-2">{booking.phone}</td>
                  <td className="p-2">{booking.route}</td>
                  <td className="p-2">{booking.date}</td>
                  <td className="p-2">{booking.time}</td>
                  <td className="p-2">
                    {Array.isArray(booking.seats)
                      ? booking.seats.join(", ")
                      : booking.seatNumber || "-"}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
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
  );
}
