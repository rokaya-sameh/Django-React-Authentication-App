import React, { useEffect, useState, useRef } from 'react';
import AxiosInstance from './AxiosInstance';

// 🔁 Reusable scrollable section
const ScrollableSection = ({ title, items, type }) => {
  const laneRef = useRef(null);

  useEffect(() => {
    const lane = laneRef.current;
    if (!lane || items.length === 0) return;

    const step = 320;
    const interval = 5000;
    const id = setInterval(() => {
      if (lane.scrollLeft + lane.clientWidth >= lane.scrollWidth) {
        lane.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        lane.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, interval);

    return () => clearInterval(id);
  }, [items]);

  return (
    <section style={{ padding: '20px 0' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>{title}</h2>
      <div
        ref={laneRef}
        style={{
          display: 'flex',
          gap: 20,
          padding: '0 20px',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        {items.map(item => (
          <ProductCard key={item.id} item={item} type={type} minWidth />
        ))}
      </div>
    </section>
  );
};

// 📦 Product Card
const ProductCard = ({ item, type, minWidth = false }) => (
  <div
    style={{
      minWidth: minWidth ? 300 : 'auto',
      border: '1px solid #ccc',
      borderRadius: 10,
      padding: 20,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
    }}
  >
    {/* Offer Card */}
    {type === 'offers' ? (
      <>
        {item.image && (
          <img
            src={item.image}
            alt={item.title || 'Offer image'}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 15,
            }}
          />
        )}
        <h3 style={{ color: '#d32f2f', fontSize: '1.5rem', marginBottom: '10px' }}>
          {item.title || 'Untitled Offer'}
        </h3>
        <p><strong>Description:</strong> {item.description || 'No description available'}</p>
        <p><strong>Discount:</strong> {item.discount_percent != null ? `${item.discount_percent}% OFF` : 'Not specified'}</p>
        <p><strong>Valid Until:</strong> {item.valid_until || 'N/A'}</p>
        <a
          href="https://wa.me/+201006601966"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '15px',
            color: 'white',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '2px solid #d32f2f',
            backgroundColor: '#d32f2f',
            padding: '10px 20px',
            borderRadius: 5,
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          Claim via WhatsApp
        </a>
      </>
    ) : (
      <>
        <h3 style={{ color: '#1976d2' }}>
          {type === 'bundles' ? item.title || 'Untitled Bundle' : item.name || 'No Name'}
        </h3>

        {item.description && (
          <p><strong>Description:</strong> {item.description}</p>
        )}

        {type === 'bundles' ? (
          <>
            {item.offer_price && (
              <p><strong>Offer Price:</strong> EGP {item.offer_price}</p>
            )}
            {item.product_id && (
              <p><strong>Product ID:</strong> {item.product_id}</p>
            )}
          </>
        ) : (
          <p><strong>Price:</strong> {item.price ? `EGP ${item.price}` : 'Not set'}</p>
        )}

        {/* Image logic */}
        {(type === 'makeup' || type === 'cosmetics' || type === 'bundles') && item.image && (
          <img
            src={item.image}
            alt={item.name || item.title || 'Product image'}
            style={{ width: '100%', borderRadius: 8, marginTop: 10 }}
          />
        )}

        <a
          href="https://wa.me/+201006601966"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '15px',
            color: 'white',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '2px solid #1976d2',
            backgroundColor: '#1976d2',
            padding: '10px 20px',
            borderRadius: 5,
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          Book via WhatsApp
        </a>
      </>
    )}
  </div>
);

// 🏠 Home Component
export default function Home() {
  const [makeup, setMakeup] = useState([]);
  const [cosmetics, setCosmetics] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    AxiosInstance.get('/makeup/').then(res => setMakeup(res.data)).catch(console.error);
    AxiosInstance.get('/cosmetics/').then(res => setCosmetics(res.data)).catch(console.error);
    AxiosInstance.get('/bundles/').then(res => setBundles(res.data)).catch(console.error);
    AxiosInstance.get('/offers/').then(res => setOffers(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <ScrollableSection title="🔥 Current Offers 🔥" items={offers} type="offers" />
      <ScrollableSection title="💄 Makeup Section" items={makeup} type="makeup" />
      <ScrollableSection title="🧴 Cosmetics Section" items={cosmetics} type="cosmetics" />
      <ScrollableSection title="🎁 Bundle Section" items={bundles} type="bundles" />
    </div>
  );
}
