import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ cart: { userId, items: [] } }, { status: 200 });
    }

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
