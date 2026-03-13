export default function Booking() {
  return (
    <main className="min-h-screen flex flex-col items-center p-10">

      <h1 className="text-3xl font-bold mb-6">Select Bus</h1>

      <form className="flex flex-col gap-4 w-80">

        <select className="border p-2 rounded">
          <option>Colombo → Kandy</option>
          <option>Colombo → Galle</option>
          <option>Colombo → Jaffna</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded"
        />

        <a
          href="/seats"
          className="bg-blue-500 text-white text-center p-2 rounded"
        >
          View Seats
        </a>

      </form>

    </main>
  );
}