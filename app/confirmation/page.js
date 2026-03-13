export default function Confirmation() {

  const bookingId = Math.floor(Math.random() * 1000000);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Booking Confirmed 🎉
      </h1>

      <p className="text-xl mb-4">
        Your Booking ID:
      </p>

      <div className="bg-gray-200 px-6 py-3 rounded text-2xl font-bold">
        {bookingId}
      </div>

      <a
        href="/"
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Back to Home
      </a>

    </main>
  );
}