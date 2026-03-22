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
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Manage Schedules</h1>

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
              schedules.map((schedule) => (
                <tr key={schedule._id} className="border-t border-gray-700">
                  <td className="p-2">{schedule.route}</td>
                  <td className="p-2">{schedule.date}</td>
                  <td className="p-2">{schedule.time}</td>
                  <td className="p-2 space-x-2">
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">Manage Seats</h2>

            <p className="mb-4 text-sm text-gray-400">
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
