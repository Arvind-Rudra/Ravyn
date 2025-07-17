import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// GET /api/admin/users/:id
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const user = await User.findById(id).select('-password'); // Exclude password

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('GET user error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch user' }, { status: 500 });
  }
}

// DELETE /api/admin/users/:id
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.error('DELETE user error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete user' }, { status: 500 });
  }
}
