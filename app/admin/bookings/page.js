export default function AdminBookings() {

  const bookings = [
    {
      id: 10234,
      name: "John Silva",
      phone: "0771234567",
      seat: 5,
      route: "Colombo → Kandy"
    },
    {
      id: 10235,
      name: "Nimal Perera",
      phone: "0719876543",
      seat: 7,
      route: "Colombo → Galle"
    }
  ];

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-3xl font-bold mb-6">
        All Bookings
      </h1>

      <table className="border w-full">

        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Booking ID</th>
            <th className="border p-2">Passenger</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Seat</th>
            <th className="border p-2">Route</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="border p-2">{b.id}</td>
              <td className="border p-2">{b.name}</td>
              <td className="border p-2">{b.phone}</td>
              <td className="border p-2">{b.seat}</td>
              <td className="border p-2">{b.route}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </main>
  );
}