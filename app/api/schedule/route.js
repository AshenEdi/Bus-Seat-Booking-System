import { connectDB } from "@/lib/mongodb";
import Schedule from "@/models/Schedule";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const route = searchParams.get("route")?.trim();
    const date = searchParams.get("date")?.trim();
    const time = searchParams.get("time")?.trim();

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

    const schedules = await Schedule.find(filter).lean();
    return NextResponse.json(schedules);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load schedules" },
      { status: 500 }
    );
  }
}

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
