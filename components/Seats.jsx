export default function Seat({ number, status }) {
  let color = "bg-green-500";

  if (status === "booked") color = "bg-red-500";

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center text-white rounded ${color}`}
    >
      {number}
    </div>
  );
}