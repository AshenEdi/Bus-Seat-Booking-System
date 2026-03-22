import { connectDB } from "@/lib/mongodb";
import Schedule from "@/models/Schedule";

export const runtime = "nodejs";

export async function DELETE(_req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return Response.json(
        { success: false, error: "Schedule ID is required." },
        { status: 400 }
      );
    }

    const deletedSchedule = await Schedule.findByIdAndDelete(id).lean();

    if (!deletedSchedule) {
      return Response.json(
        { success: false, error: "Schedule not found." },
        { status: 404 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message || "Failed to delete schedule." },
      { status: 500 }
    );
  }
}
