'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle, AlertCircle } from 'lucide-react';
import SkewButton from '@/components/ui/Button';

// Example: get userId from auth/session (replace with your actual logic)
const getUserId = () => typeof window !== 'undefined' ? localStorage.getItem('ravyn_user_id') : null;

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = getUserId();

  // Fetch cart from API
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then(res => res.json())
      .then(data => {
        setCart(data.cart?.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  // Update quantity in DB and local state
  const handleQuantity = async (productId, delta, size, color) => {
    const item = cart.find(
      i => i.productId === productId && i.size === size && i.color === color
    );
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + delta);

    // Update on server
    await fetch('/api/cart/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity: newQuantity, size, color }),
    });

    // Update local state
    setCart(cart =>
      cart.map(i =>
        i.productId === productId && i.size === size && i.color === color
          ? { ...i, quantity: newQuantity }
          : i
      )
    );
  };

  // Remove item from DB and local state
  const handleRemove = async (productId, size, color) => {
    await fetch('/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, size, color }),
    });
    setCart(cart =>
      cart.filter(
        i =>
          !(
            i.productId === productId &&
            (size ? i.size === size : true) &&
            (color ? i.color === color : true)
          )
      )
    );
  };

  // Clear cart in DB and local state
  const handleCheckout = async () => {
    await fetch('/api/cart/clear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    setCheckoutSuccess(true);
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="relative max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <ShoppingCart className="w-10 h-10" style={{ color: 'var(--color-cyberyellow)' }} />
              <div
                className="absolute inset-0 w-10 h-10 rounded-full animate-ping"
                style={{ backgroundColor: 'var(--color-cyberyellow)', opacity: 0.3 }}
              ></div>
            </div>
            <h1
              className="text-4xl font-bold tracking-wider"
              style={{
                color: 'var(--color-typography)',
                fontFamily: 'Zoredo Blocker',
              }}
            >
              CART
            </h1>
          </div>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: 'var(--color-cyberyellow)' }}></div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl overflow-hidden">
          <div className="p-8 space-y-6">
            {loading && (
              <div className="text-center text-sm" style={{ color: 'var(--color-cyberyellow)' }}>
                Loading cart...
              </div>
            )}
            {checkoutSuccess && (
              <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(34,197,94,0.5)', backgroundColor: 'rgba(34,197,94,0.1)' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" style={{ color: 'rgba(34,197,94,1)' }} />
                  <span className="text-sm font-medium" style={{ color: 'rgba(34,197,94,1)' }}>
                    Checkout successful! Neural goods inbound.
                  </span>
                </div>
              </div>
            )}
            {!loading && cart.length === 0 && !checkoutSuccess && (
              <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(253,224,71,0.5)', backgroundColor: 'rgba(253,224,71,0.1)' }}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" style={{ color: 'var(--color-cyberyellow)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-cyberyellow)' }}>
                    Your cart is empty.
                  </span>
                </div>
              </div>
            )}
            {!loading && cart.length > 0 && (
              <div className="space-y-4">
                {cart.map(item => (
                  <div
                    key={item.productId + (item.size || '') + (item.color || '')}
                    className="flex items-center gap-4 rounded-lg p-4 border"
                    style={{
                      backgroundColor: 'rgba(18,18,18,0.3)',
                      borderColor: 'var(--color-jetblack)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold" style={{ color: 'var(--color-typography)' }}>{item.name}</div>
                      <div className="text-sm" style={{ color: 'var(--color-cyberyellow)' }}>
                        ${item.price?.toFixed(2)}
                      </div>
                      {(item.size || item.color) && (
                        <div className="text-xs mt-1" style={{ color: 'var(--color-electricblue)' }}>
                          {item.size && <span>Size: {item.size}</span>}
                          {item.size && item.color && <span className="mx-2">|</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="p-1 rounded transition"
                          style={{ backgroundColor: 'var(--color-jetblack)' }}
                          onClick={() => handleQuantity(item.productId, -1, item.size, item.color)}
                          aria-label="Decrease"
                        >
                          <Minus className="w-4 h-4" style={{ color: 'var(--color-typography)' }} />
                        </button>
                        <span className="px-2" style={{ color: 'var(--color-typography)' }}>{item.quantity}</span>
                        <button
                          className="p-1 rounded transition"
                          style={{ backgroundColor: 'var(--color-jetblack)' }}
                          onClick={() => handleQuantity(item.productId, 1, item.size, item.color)}
                          aria-label="Increase"
                        >
                          <Plus className="w-4 h-4" style={{ color: 'var(--color-typography)' }} />
                        </button>
                      </div>
                    </div>
                    <button
                      className="p-2 rounded transition"
                      style={{ backgroundColor: 'rgba(255,59,48,0.2)' }}
                      onClick={() => handleRemove(item.productId, item.size, item.color)}
                      aria-label="Remove"
                    >
                      <Trash2 className="w-5 h-5" style={{ color: 'var(--color-electricred)' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mt-6">
              <span className="text-lg font-bold" style={{ color: 'var(--color-typography)' }}>Total</span>
              <span className="text-lg font-bold" style={{ color: 'var(--color-cyberyellow)' }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <SkewButton
              width={'100%'}
              onClick={handleCheckout}
              disabled={cart.length === 0 || checkoutSuccess}
              className="w-full text-center mt-4"
            >
              {checkoutSuccess ? 'Checked Out' : 'Proceed to Checkout'}
            </SkewButton>
          </div>
        </div>
      </div>
    </div>
  );
}