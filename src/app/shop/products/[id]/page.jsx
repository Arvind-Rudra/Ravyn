'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Star, ShoppingBag, ArrowLeft, Zap, MessageCircle } from 'lucide-react';
import SkewButton from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

// Safely choose product/related image
function safeSrc(src) {
  if (!src || typeof src !== 'string' || !src.trim()) return '/skin.png';
  return src;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addCartLoading, setAddCartLoading] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // New review input state
  const [reviewText, setReviewText] = useState('');
  const [sendingReview, setSendingReview] = useState(false);

  // GSAP refs
  const cardRef = useRef(null);
  const imagesRef = useRef(null);
  const infoRef = useRef(null);
  const reviewsRef = useRef(null);
  const relatedRef = useRef(null);
  const relatedSliderRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/products/${id}/reviews`)
      .then((res) => setReviews(res.data.reviews || []))
      .catch(() => setReviews([]));
  }, [id]);

  // Fetch related
  useEffect(() => {
    if (!product) return;
    setLoadingRelated(true);
    const slug = product.slug || '';
    axios
      .get(`/api/products/related?slug=${encodeURIComponent(slug)}`)
      .then((res) => setRelated(res.data.related || []))
      .catch(() => setRelated([]))
      .finally(() => setLoadingRelated(false));
  }, [product]);

  // GSAP animations
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.7 });
    gsap.fromTo([imagesRef.current, infoRef.current], { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, delay: 0.25, stagger: 0.12 });
    gsap.fromTo(reviewsRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.8 });
    // Animate-in related cards individually, but not the whole slider
    if (relatedSliderRef.current) {
      gsap.fromTo(
        relatedSliderRef.current.querySelectorAll('.related-card'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 0.65, delay: 1.2, ease: 'power2.out' }
      );
    }
  }, [loading, product?.name, related.length]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAddCartLoading(true);
    setCartSuccess(null);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('ravyn_user_id') : null;
    if (!userId) {
      setCartSuccess('Please login to add to cart.');
      setAddCartLoading(false);
      return;
    }
    try {
      await axios.post('/api/cart/add', {
        userId,
        productId: product._id,
        name: product.name,
        image: product.images?.[0] || '',
        price: product.finalPrice || product.price,
        quantity: 1,
        size: product.sizes?.[0] || null,
        color: product.colors?.[0] || null,
      });
      setCartSuccess('Added to cart!');
    } catch {
      setCartSuccess('Failed to add to cart');
    }
    setAddCartLoading(false);
    setTimeout(() => setCartSuccess(null), 2000);
  };

  // Review form submit handler
  const handleSendReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setSendingReview(true);
    setReviews([
      {
        userName: "You",
        comment: reviewText.trim(),
        rating: 5,
        date: new Date().toISOString().slice(0, 10)
      },
      ...reviews
    ]);
    setReviewText('');
    setSendingReview(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-[#FFD500] text-lg animate-pulse">Loading product...</div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-red-500 text-lg">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent">
      {/* Main Product Card */}
      <div
        className="relative max-w-4xl w-full bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl flex flex-col md:flex-row overflow-hidden"
        ref={cardRef}
      >
        {/* ...images/info unchanged ... */}
        {/* Left: Product Images */}
        <div ref={imagesRef} className="md:w-1/2 flex flex-col items-center justify-center p-8 bg-black/30">
          <div className="w-full flex justify-start mb-4">
            <Link href="/shop/products">
              <span className="inline-flex items-center gap-1 text-[#FFD500] hover:underline cursor-pointer transition-all duration-200 hover:scale-105">
                <ArrowLeft className="w-5 h-5" /> Back
              </span>
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <Image
              src={'/skin.png'}
              alt={product.name}
              width={350}
              height={350}
              className="rounded-xl object-contain bg-black/20 border border-[#FFD500] shadow-xl"
              style={{ maxHeight: 350 }}
              priority
            />
          </div>
          <div className="flex gap-2 mt-4">
            {product.images?.slice(1, 4).map((img, idx) =>
              !!img && (
                <Image
                  key={img + idx}
                  src={'/skin.png'}
                  alt={`Product image ${idx + 2}`}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover border border-gray-700 transition-all duration-300 hover:scale-[1.15] hover:border-[#FFD500]"
                />
              )
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div ref={infoRef} className="md:w-1/2 p-8 flex flex-col justify-between bg-black/5">
          {/* ...info unchanged ... */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-7 h-7 text-[#FFD500] animate-bounce" />
              <h1
                className="text-3xl md:text-4xl font-bold tracking-wide"
                style={{ fontFamily: 'Zoredo Blocker', color: 'var(--color-typography)' }}
              >
                {product.name}
              </h1>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#FFD500] text-lg font-bold drop-shadow">
                ₹{product.finalPrice || product.price}
              </span>
              {product.discount > 0 && (
                <span className="line-through text-gray-400 text-base">
                  ₹{product.price}
                </span>
              )}
              <span className="ml-2 flex items-center gap-1 text-yellow-400 text-sm">
                <Star className="w-4 h-4 animate-spin" />
                {product.ratings?.average?.toFixed(1) || '0.0'}
                <span className="text-gray-400">({product.ratings?.count || 0})</span>
              </span>
            </div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FFD500]/10 text-[#FFD500] mr-2">
                {product.category}
              </span>
              {product.subcategory && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#3D5AFE]/10 text-[#3D5AFE]">
                  {product.subcategory}
                </span>
              )}
            </div>
            <p className="text-gray-300 mb-6">{product.description}</p>
            {product.sizes?.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-gray-400 mr-2">Size:</span>
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-block px-2 py-1 mr-2 rounded bg-[#FFD500]/10 text-[#FFD500] text-xs font-semibold"
                  >
                    {size}
                  </span>
                ))}
              </div>
            )}
            {product.colors?.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-gray-400 mr-2">Color:</span>
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="inline-block w-5 h-5 rounded-full border-2 border-gray-700 mr-2"
                    style={{ background: color }}
                  ></span>
                ))}
              </div>
            )}
            {product.features?.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-gray-400">Features:</span>
                <ul className="list-disc ml-6 text-gray-300 text-sm">
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.ingredients?.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-gray-400">Ingredients:</span>
                <ul className="list-disc ml-6 text-gray-300 text-sm">
                  {product.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <SkewButton
              width="100%"
              onClick={handleAddToCart}
              disabled={addCartLoading}
              className={`w-full text-center ${
                addCartLoading ? 'scale-95' : 'hover:scale-105 transition-transform'
              }`}
              style={{
                boxShadow: addCartLoading ? '0 0 0 0 #FFD500' : '0 4px 30px -8px #FFD50040',
                backgroundColor: '#3D5AFE'
              }}
            >
              {addCartLoading ? (
                <span className="animate-pulse">Adding...</span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ShoppingBag /> Add to Cart
                </span>
              )}
            </SkewButton>
            {cartSuccess && (
              <div className="mt-2 text-center text-[#FFD500] text-xs animate-bounce">{cartSuccess}</div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div
        ref={reviewsRef}
        className="max-w-4xl w-full mt-12 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl p-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-[#FFD500]" />
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: 'Zoredo Blocker', color: 'var(--color-typography)' }}
          >
            Reviews
          </h2>
        </div>
        {reviews.length === 0 ? (
          <div className="text-gray-400 mb-6">No reviews yet.</div>
        ) : (
          <div className="space-y-4 mb-8">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="border-b border-gray-800 pb-4 animate-fadein"
                style={{
                  animationDelay: `${0.05 * idx}s`,
                  animationName: 'fadeInUp',
                  animationDuration: '0.7s',
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#FFD500]">{review.userName || 'Anonymous'}</span>
                  <span className="flex items-center gap-1 text-yellow-400 text-xs">
                    <Star className="w-4 h-4" />
                    {review.rating?.toFixed(1) || '0.0'}
                  </span>
                </div>
                <div className="text-gray-300 text-sm">{review.comment}</div>
              </div>
            ))}
          </div>
        )}

        {/* --- New Review Input and Send Button --- */}
        <form
          onSubmit={handleSendReview}
          className="flex w-full gap-3 items-center mt-4"
        >
          <input
            type="text"
            className="flex-1 rounded-lg border border-gray-700 bg-[var(--color-jetblack)] text-[var(--color-typography)] placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-[var(--color-cyberyellow)] transition"
            placeholder="Write your review..."
            value={reviewText}
            maxLength={512}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={sendingReview}
          />
          <SkewButton
            type="submit"
            style={{
              width: 120,
              height: 44,
              fontSize: '17px',
              backgroundColor: '#FFD500',
              color: '#121212'
            }}
            disabled={sendingReview || !reviewText.trim()}
          >
            {sendingReview ? 'Sending...' : 'Send'}
          </SkewButton>
        </form>
      </div>


      {/* Related Products Section - SLIDER STYLE */}
      <div
        ref={relatedRef}
        className="max-w-5xl w-full mt-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-[#3D5AFE] animate-bounce" />
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: 'Zoredo Blocker', color: 'var(--color-typography)' }}
          >
            Related Products
          </h2>
        </div>
        {loadingRelated ? (
          <div className="text-[#FFD500] animate-pulse">Loading related products...</div>
        ) : related.length === 0 ? (
          <div className="text-gray-400">No related products found.</div>
        ) : (
          <div
            ref={relatedSliderRef}
            className="flex overflow-x-auto gap-6 pb-3 pl-1 pr-1"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: '#FFD500 #222'
            }}
          >
            {related.map((rel, i) => (
              <Link key={rel._id} href={`/shop/products/${rel._id}`} scroll={false}>
                <div
                  className="related-card flex-shrink-0 w-64 bg-black/30 border border-gray-800 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center animate-fadein"
                  style={{
                    scrollSnapAlign: 'center',
                    animationDelay: `${0.12 * i}s`,
                    animationName: 'fadeInScale',
                    animationDuration: '0.6s',
                    animationFillMode: 'both'
                  }}
                >
                  <Image
                    src={'/skin.png'}
                    alt={rel.name}
                    width={160}
                    height={160}
                    className="rounded-lg object-contain mb-2"
                  />
                  <div className="font-semibold text-[var(--color-typography)] text-center">{rel.name}</div>
                  <div className="text-[#FFD500] font-bold text-center">₹{rel.finalPrice || rel.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {/* Style the scrollbar for sleek "track" look */}
        <style jsx global>{`
          .overflow-x-auto::-webkit-scrollbar {
            height: 7px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(90deg, #FFD50088, #FFD50044 50%, #0000 100%);
            border-radius: 4px;
          }
          .overflow-x-auto::-webkit-scrollbar-track {
            background: #181818;
            border-radius: 4px;
          }
        `}</style>
      </div>

      {/* Animate.css for extra effect
      <style jsx global>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(42px);}
          100% { opacity: 1; transform: none;}
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.92);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-fadein {
          animation-timing-function: cubic-bezier(0.33,1,0.68,1);
        }
      `}</style> */}
    </div>
  );
}
