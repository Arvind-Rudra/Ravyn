import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { userId, productId, quantity, size, color } = await req.json();

    if (!userId || !productId || quantity == null) {
      return NextResponse.json(
        { error: 'userId, productId and quantity are required' },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Find item index
    const itemIndex = cart.items.findIndex(item =>
      item.productId.toString() === productId &&
      (size ? item.size === size : true) &&
      (color ? item.color === color : true)
    );

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }

    if (quantity <= 0) {
      // Remove the item if quantity set to 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    return NextResponse.json({ message: 'Cart item updated', cart }, { status: 200 });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
