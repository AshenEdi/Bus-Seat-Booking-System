import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: Number,
    required: true,
  },
  passengerName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);