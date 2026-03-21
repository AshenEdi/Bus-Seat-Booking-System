"use client";

import { useEffect, useState } from "react";

export default function SchedulePage() {
  const [route, setRoute] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [schedules, setSchedules] = useState([]);

  // 🔥 Modal states
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);

  // 🔹 Fetch schedules
  const fetchSchedules = async () => {
    try {
      const res = await fetch("/api/schedule");
      const data = await res.json();
      setSchedules(data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // 🔹 Add schedule
  const handleAddSchedule = async () => {
    if (!route || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ route, date, time }),
      });

      if (res.ok) {
        alert("Schedule added ✅");
        setRoute("");
        setDate("");
        setTime("");
        fetchSchedules();
      } else {
        alert("Failed ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete schedule
  const handleDelete = async (id) => {
    if (!confirm("Delete this schedule?")) return;

    try {
      const res = await fetch(`/api/schedule/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Deleted 🗑️");
        fetchSchedules();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch bookings for modal
  const fetchBookings = async (schedule) => {
    try {
      const res = await fetch(
        `/api/book?scheduleId=${schedule._id}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Open modal
  const openManageSeats = (sch) => {
    setSelectedSchedule(sch);
    setShowModal(true);
    fetchBookings(sch);
  };

  // 🔹 Cancel booking
  const handleCancelBooking = async (id) => {
    if (!confirm("Cancel this booking?")) return;

    try {
      const res = await fetch(`/api/book/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Booking cancelled ✅");
        fetchBookings(selectedSchedule);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Manage Schedules</h1>

      {/* 🔹 Add Schedule */}
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Schedule</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700"
          />

          <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <button
          onClick={handleAddSchedule}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          Add Schedule
        </button>
      </div>

      {/* 🔹 Schedule Table */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">All Schedules</h2>

        <table className="w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 border">Route</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {schedules.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No schedules found
                </td>
              </tr>
            ) : (
              schedules.map((sch) => (
                <tr key={sch._id} className="border-t border-gray-700">
                  <td className="p-2">{sch.route}</td>
                  <td className="p-2">{sch.date}</td>
                  <td className="p-2">{sch.time}</td>

                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => openManageSeats(sch)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Manage Seats
                    </button>

                    <button
                      onClick={() => handleDelete(sch._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              Manage Seats
            </h2>

            <p className="mb-4 text-sm text-gray-400">
              {selectedSchedule?.route} | {selectedSchedule?.date} |{" "}
              {selectedSchedule?.time}
            </p>

            {/* Seats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[...Array(20)].map((_, index) => {
                const seatNumber = index + 1;

                const booking = bookings.find(
                  (b) => b.seatNumber === seatNumber
                );

                return (
                  <div
                    key={seatNumber}
                    className={`p-2 text-center rounded cursor-pointer ${
                      booking ? "bg-red-600" : "bg-green-600"
                    }`}
                    onClick={() => {
                      if (booking) {
                        handleCancelBooking(booking._id);
                      }
                    }}
                  >
                    {seatNumber}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-green-400">Available</span>
              <span className="text-red-400">
                Booked (Click to cancel)
              </span>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}