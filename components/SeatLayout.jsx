import Seat from "./Seats";

export default function SeatLayout() {

  const seats = [
    { number: 1, status: "available" },
    { number: 2, status: "available" },
    { number: 3, status: "booked" },
    { number: 4, status: "available" }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {seats.map((seat) => (
        <Seat key={seat.number} {...seat} />
      ))}
    </div>
  );
}
