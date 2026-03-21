export default function Seat({ number, status, onSelect, isSelected }) {
  return (
    <div
      onClick={() => status !== "booked" && onSelect(number)}
      className={`w-10 h-10 flex items-center justify-center text-white rounded
        ${status === "booked"
          ? "bg-red-500 cursor-not-allowed opacity-70"
          : "bg-green-500 cursor-pointer hover:bg-green-600"}
        ${isSelected ? "ring-4 ring-blue-400" : ""}
      `}
    >
      {number}
    </div>
  );
}