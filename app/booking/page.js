import Link from "next/link";
import SeatLayout from "@/components/SeatLayout";

export default async function BookingPage({ searchParams }) {
  const params = await searchParams;
  const route = params?.route || "";
  const date = params?.date || "";
  const time = params?.time || "";

  if (!route || !date || !time) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl font-bold">Missing Trip Details</h1>
        <p className="text-center text-gray-600">
          Please select route, date, and time before choosing seats.
        </p>
        <Link
          href="/route"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go to Route Selection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SeatLayout route={route} date={date} time={time} />
    </div>
  );
}
