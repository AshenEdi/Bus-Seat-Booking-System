"use client";

import { useEffect, useState } from "react";
import SeatLayout from "@/components/SeatLayout";

export default function SchedulePage() {
  const [route, setRoute] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [disabledSeats, setDisabledSeats] = useState([]);

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
    let cancelled = false;

    async function loadSchedules() {
      try {
        const res = await fetch("/api/schedule");
        const data = await res.json();

        if (!cancelled) {
          setSchedules(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching schedules:", err);
        }
      }
    }

    loadSchedules();

    return () => {
      cancelled = true;
    };
  }, []);

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
        alert("Schedule added");
        setRoute("");
        setDate("");
        setTime("");
        fetchSchedules();
      } else {
        alert("Failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this schedule?")) return;

    try {
      const res = await fetch(`/api/schedule/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Deleted");
        fetchSchedules();
      } else {
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        alert(data?.error || "Failed to delete schedule");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting schedule");
    }
  };

  const openManageSeats = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
    setDisabledSeats(schedule.disabledSeats || []);
  };

  const handleSaveDisabledSeats = async () => {
    if (!selectedSchedule?._id) {
      alert("No schedule selected");
      return;
    }

    try {
      const res = await fetch("/api/schedule/disableSeats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduleId: selectedSchedule._id,
          disabledSeats,
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (res.ok && data?.success) {
        alert("Seats saved");
        setShowModal(false);
        fetchSchedules();
        return;
      }

      alert(data?.error || "Failed to save seats");
    } catch (err) {
      console.error(err);
      alert("Error saving seats");
    }
  };

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
      Manage Schedules
    </h1>

    {/* 🔹 Add Schedule */}
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl mb-8 max-w-5xl mx-auto shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add Schedule</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className="p-2 rounded bg-white/20 border border-gray-300 text-white"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 rounded bg-white/20 border border-gray-300 text-white"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded bg-white/20 border border-gray-300 text-white"
        />
      </div>

      <button
        onClick={handleAddSchedule}
        className="mt-5 px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
      >
        Add Schedule
      </button>
    </div>

    {/* 🔹 Table */}
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl max-w-5xl mx-auto shadow-lg">
      <h2 className="text-xl font-semibold mb-4">All Schedules</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-500">
          <thead className="bg-white/20">
            <tr>
              <th className="p-3 border">Route</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Actions</th>
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
              schedules.map((schedule) => (
                <tr key={schedule._id} className="border-t border-gray-600">
                  <td className="p-3">{schedule.route}</td>
                  <td className="p-3">{schedule.date}</td>
                  <td className="p-3">{schedule.time}</td>

                  <td className="p-3 space-x-8 text-center">
                    <button
                      onClick={() => openManageSeats(schedule)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Manage Seats
                    </button>

                    <button
                      onClick={() => handleDelete(schedule._id)}
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
    </div>

    {/* 🔥 MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-[520px] text-white shadow-lg">

          <h2 className="text-xl font-bold mb-3">Manage Seats</h2>

          <p className="mb-4 text-sm text-gray-300">
            {selectedSchedule?.route} | {selectedSchedule?.date} |{" "}
            {selectedSchedule?.time}
          </p>

          <div className="mb-6">
            <SeatLayout
              route={selectedSchedule?.route}
              date={selectedSchedule?.date}
              time={selectedSchedule?.time}
              mode="admin"
              disabledSeats={disabledSeats}
              setDisabledSeats={setDisabledSeats}
            />
          </div>

          <button
            onClick={handleSaveDisabledSeats}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded mb-3"
          >
            Save Changes
          </button>

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
