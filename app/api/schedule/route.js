import { connectDB } from "@/lib/mongodb";
import Schedule from "@/models/Schedule";
import { NextResponse } from "next/server";

// GET all schedules
export async function GET() {
  await connectDB();
  const schedules = await Schedule.find();
  return NextResponse.json(schedules);
}

// POST new schedule
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { route, date, time } = body;

    if (!route || !date || !time) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const newSchedule = new Schedule({
      route,
      date,
      time,
    });

    await newSchedule.save();

    return NextResponse.json(newSchedule, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}