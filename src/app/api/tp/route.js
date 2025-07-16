import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb'; // Your MongoDB connection
import slugify from 'slugify';

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();

    // Auto-generate slug if not provided
    const slug = body.slug || slugify(body.name, { lower: true, strict: true });

    const product = new Product({
      ...body,
      slug,
    });

    await product.save();

    return NextResponse.json(
      { message: 'Product created successfully', product },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}
