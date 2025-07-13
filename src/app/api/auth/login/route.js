import bcrypt from "bcrypt";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return Response.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
