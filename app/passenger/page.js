export default function Passenger() {
  return (
    <main className="min-h-screen flex flex-col items-center p-10">

      <h1 className="text-3xl font-bold mb-6">
        Passenger Details
      </h1>

      <form className="flex flex-col gap-4 w-80">

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="border p-2 rounded"
        />

        <a
          href="/confirmation"
          className="bg-green-600 text-white text-center p-2 rounded"
        >
          Confirm Booking
        </a>

      </form>

    </main>
  );
}