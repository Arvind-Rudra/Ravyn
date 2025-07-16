import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find().sort({ createdAt: -1 }); // newest first

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}
