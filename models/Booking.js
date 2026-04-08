import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      default: "",
    },
    route: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    seats: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const existingBookingModel = mongoose.models.Booking;

if (
  existingBookingModel &&
  (
    existingBookingModel.schema.path("bookingId") ||
    existingBookingModel.schema.path("passengerName") ||
    existingBookingModel.schema.path("seatNumber")
  )
) {
  delete mongoose.models.Booking;
}

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
