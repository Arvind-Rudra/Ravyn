import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }

    // Find the original product
    const product = await Product.findOne({ slug });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Find related products by category, tags, or subcategory
    const relatedProducts = await Product.find({
      slug: { $ne: slug }, // exclude the current product
      $or: [
        { category: product.category },
        { subcategory: product.subcategory },
        { tags: { $in: product.tags } }
      ]
    })
      .limit(10)
      .sort({ createdAt: -1 });

    return NextResponse.json({ related: relatedProducts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching related products:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
