import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export const runtime = "nodejs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const route = searchParams.get("route")?.trim();
  const date = searchParams.get("date")?.trim();
  const time = searchParams.get("time")?.trim();

  try {
    await connectDB();

    const filter = {};
    if (route) {
      filter.route = route;
    }
    if (date) {
      filter.date = date;
    }
    if (time) {
      filter.time = time;
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 }).lean();
    return Response.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message || "Failed to load bookings." },
      { status: 500 }
    );
  }
}

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

  const seats = Array.isArray(body?.seats)
    ? body.seats
        .map((seat) => Number(seat))
        .filter((seat) => Number.isInteger(seat) && seat > 0)
    : Number.isInteger(Number(body?.seatNumber)) && Number(body?.seatNumber) > 0
      ? [Number(body.seatNumber)]
      : [];

  const bookingData = {
    route: body?.route?.toString().trim() || "",
    date: body?.date?.toString().trim() || "",
    time: body?.time?.toString().trim() || "",
    name: body?.name?.toString().trim() || body?.passengerName?.toString().trim() || "",
    phone: body?.phone?.toString().trim() || "",
    seats: [...new Set(seats)],
  };

  try {
    await connectDB();

    if (
      bookingData.route &&
      bookingData.date &&
      bookingData.time &&
      bookingData.seats.length > 0
    ) {
      const existing = await Booking.findOne({
        route: bookingData.route,
        date: bookingData.date,
        time: bookingData.time,
        seats: { $in: bookingData.seats },
      }).lean();

      if (existing) {
        return Response.json(
          { success: false, error: "One or more selected seats are already booked." },
          { status: 409 }
        );
      }
    }

    const booking = await Booking.create(bookingData);
    return Response.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message || "Server error." },
      { status: 500 }
    );
  }
}
