import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';

export async function POST(req) {
  try {
    await connectToDatabase();

    const {
      userId,
      shippingAddress,
      paymentMethod,
      paymentStatus = 'pending'
    } = await req.json();

    if (!userId || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Create new order
    const order = new Order({
      userId,
      items: cart.items,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      totalAmount
    });

    await order.save();

    // Clear user's cart after successful order
    cart.items = [];
    await cart.save();

    return NextResponse.json(
      { message: 'Order placed successfully', orderId: order._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
