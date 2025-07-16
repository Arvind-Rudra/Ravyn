import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export async function POST(req) {
  try {
    await connectToDatabase();
    const { orderId, trackingNumber } = await req.json();

    if (!orderId && !trackingNumber) {
      return NextResponse.json(
        { error: 'Either orderId or trackingNumber is required' },
        { status: 400 }
      );
    }

    let order = null;

    if (orderId && isValidObjectId(orderId)) {
      order = await Order.findById(orderId);
    } else if (trackingNumber) {
      order = await Order.findOne({ trackingNumber });
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        orderStatus: order.orderStatus,
        trackingNumber: order.trackingNumber,
        updatedAt: order.updatedAt,
        shippingAddress: order.shippingAddress
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
