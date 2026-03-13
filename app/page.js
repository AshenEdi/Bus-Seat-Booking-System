export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center">

      {/* Header */}
      <header className="w-full bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Bus Seat Booking System
      </header>

      {/* Hero Section */}
      <section className="mt-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Book Your Bus Seat Easily
        </h1>

        <p className="text-gray-600 mb-8">
          Choose your route, select your seat, and confirm your booking in seconds.
        </p>

        <a
          href="/booking"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Start Booking
        </a>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 px-10">

        <div className="bg-white p-6 shadow rounded">
          <h2 className="font-bold text-xl mb-2">Select Route</h2>
          <p className="text-gray-600">
            Choose your bus route and travel date.
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="font-bold text-xl mb-2">Choose Seat</h2>
          <p className="text-gray-600">
            View available seats and select your preferred seat.
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="font-bold text-xl mb-2">Confirm Booking</h2>
          <p className="text-gray-600">
            Enter passenger details and confirm your booking.
          </p>
        </div>

      </section>

    </main>
  );
}