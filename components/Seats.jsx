export default function Seat({
  number,
  status,
  onSelect,
  isSelected,
  isLocked = false,
}) {
  let color = "bg-green-500";

  if (status === "booked") {
    color = "bg-red-600";
  } else if (status === "disabled") {
    color = "bg-gray-500";
  } else if (isSelected) {
    color = "bg-blue-500";
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(number)}
      disabled={isLocked}
      className={`w-10 h-10 flex items-center justify-center rounded text-white ${color} ${
        isLocked ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      }`}
    >
      {number}
    </button>
  );
}
