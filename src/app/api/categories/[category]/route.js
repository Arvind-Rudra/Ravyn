import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const { category } = await params;

    if (!category) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') } // case-insensitive match
    }).sort({ createdAt: -1 });

    return NextResponse.json({ category, products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
