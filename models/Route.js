import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    default: 40,
  }
});

export default mongoose.models.Route || mongoose.model("Route", RouteSchema);