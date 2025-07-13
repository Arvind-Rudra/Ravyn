import bcrypt from "bcrypt";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return Response.json({ message: "User created", user: newUser });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
