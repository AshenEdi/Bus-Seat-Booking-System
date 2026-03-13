import connectDB from "@/lib/mongodb";
import Route from "@/models/Route";

export async function POST(req) {
  try {

    await connectDB();

    const body = await req.json();

    const newRoute = await Route.create(body);

    return Response.json({
      success: true,
      route: newRoute
    });

  } catch (error) {

    return Response.json({
      success: false,
      message: error.message
    });

  }
}