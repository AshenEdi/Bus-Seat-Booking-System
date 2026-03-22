import { connectDB } from "@/lib/mongodb";
import Schedule from "@/models/Schedule";

export const runtime = "nodejs";

export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const scheduleId = body?.scheduleId?.toString().trim();
  const disabledSeats = Array.isArray(body?.disabledSeats)
    ? [
        ...new Set(
          body.disabledSeats
            .map((seat) => Number(seat))
            .filter((seat) => Number.isInteger(seat) && seat > 0)
        ),
      ]
    : [];

  if (!scheduleId) {
    return Response.json(
      { success: false, error: "Schedule ID is required." },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { disabledSeats },
      { new: true }
    ).lean();

    if (!updatedSchedule) {
      return Response.json(
        { success: false, error: "Schedule not found." },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, schedule: updatedSchedule },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message || "Failed to save disabled seats." },
      { status: 500 }
    );
  }
}
