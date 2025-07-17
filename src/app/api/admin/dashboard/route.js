import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

// GET /api/admin/dashboard
export async function GET() {
  try {
    await connectToDatabase();

    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Revenue (sum of all orders' totals)
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    // Orders by Status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalRevenue,
        ordersByStatus,
      },
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
