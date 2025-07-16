import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// export async function PUT(req, { params }) {
//   try {
//     await connectToDatabase();
//     const { id } = params;
//     const updates = await req.json();

//     if (!isValidObjectId(id)) {
//       return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
//       new: true,
//       runValidators: true
//     });

//     if (!updatedOrder) {
//       return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Order updated', order: updatedOrder }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating order:', error);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }
