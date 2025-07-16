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
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Clear the cart
    cart.items = [];
    await cart.save();

    return NextResponse.json({ message: 'Cart cleared', cart }, { status: 200 });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
