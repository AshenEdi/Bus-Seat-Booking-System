import Link from "next/link";

export default async function Confirmation({ searchParams }) {
  const params = await searchParams;
  const bookingId = params?.bookingId || "Not available";

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)),
          url('/images/bus-wall.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Glass Card */}
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl text-center text-white shadow-lg">

        <h1 className="text-3xl font-bold mb-4 text-green-400">
          Booking Confirmed!
        </h1>

        <p className="text-lg mb-4">Your Booking ID :</p>

        <div className="bg-white/20 px-6 py-3 rounded text-2xl font-bold mb-6">
          {bookingId}
        </div>

        <Link
          href="/"
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>

      </div>
    </main>
  );
}