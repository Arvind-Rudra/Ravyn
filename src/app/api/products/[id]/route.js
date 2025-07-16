import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Utility to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid Product ID' }, { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const updates = await req.json();
    const slug = updates.slug || slugify(updates.name, { lower: true, strict: true });
    updates.slug = slug;
    

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid Product ID' }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Product updated', product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid Product ID' }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
