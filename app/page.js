import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)),
          url('/images/bus-wall.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="w-full bg-blue-600/80 backdrop-blur text-white p-4 text-center text-2xl font-bold">
        Bus Seat Booking System
      </header>

      {/* Hero Section */}
      <section className="mt-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Book Your Bus Seat Easily
        </h1>

        <p className="text-gray-200 mb-8">
          Choose your route, select your seat, and confirm your booking in seconds.
        </p>

        <Link
          href="/route"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Start Booking
        </Link>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 px-10 w-full max-w-5xl">

  {/* Card 1 */}
  <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center border border-white/20 hover:bg-white/20 hover:scale-105 transition duration-300">
    
    <h2 className="font-semibold text-sm text-gray-300 mb-2">
      Step 1
    </h2>

    <h3 className="font-bold text-xl mb-3 text-white">
      Select Route
    </h3>

    <p className="text-gray-300 text-sm leading-relaxed">
      Choose your bus route and travel date quickly with a simple selection process.
    </p>
  </div>

  {/* Card 2 */}
  <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center border border-white/20 hover:bg-white/20 hover:scale-105 transition duration-300">
    
    <h2 className="font-semibold text-sm text-gray-300 mb-2">
      Step 2
    </h2>

    <h3 className="font-bold text-xl mb-3 text-white">
      Choose Seat
    </h3>

    <p className="text-gray-300 text-sm leading-relaxed">
      View available seats in real-time and select your preferred seat easily.
    </p>
  </div>

  {/* Card 3 */}
  <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center border border-white/20 hover:bg-white/20 hover:scale-105 transition duration-300">
    
    <h2 className="font-semibold text-sm text-gray-300 mb-2">
      Step 3
    </h2>

    <h3 className="font-bold text-xl mb-3 text-white">
      Confirm Booking
    </h3>

    <p className="text-gray-300 text-sm leading-relaxed">
      Enter passenger details and confirm your booking in seconds.
    </p>
  </div>

</section>
    </main>
  );
}