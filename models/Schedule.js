import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  route: String,
  date: String,
  time: String,
});

export default mongoose.models.Schedule ||
  mongoose.model("Schedule", ScheduleSchema);