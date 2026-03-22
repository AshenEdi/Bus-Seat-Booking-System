import Link from "next/link";
import SeatLayout from "@/components/SeatLayout";

export default async function BookingPage({ searchParams }) {
  const params = await searchParams;
  const route = params?.route || "";
  const date = params?.date || "";
  const time = params?.time || "";

  if (!route || !date || !time) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
            url('/images/bus-wall.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-center">
          <h1 className="text-2xl font-bold mb-2">
            Missing Trip Details
          </h1>

          <p className="text-gray-300 mb-4">
            Please select route, date, and time before choosing seats.
          </p>

          <Link
            href="/route"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Go to Route Selection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)),
          url('/images/bus-wall.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header Info */}
      <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl mb-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Your Trip</h2>
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

      {/* Seat Layout */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
        <SeatLayout route={route} date={date} time={time} />
      </div>
    </div>
  );
}