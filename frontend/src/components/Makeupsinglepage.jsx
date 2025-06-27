import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MakeupSingle() {
  const { id } = useParams();
  const [makeup, setMakeup] = useState(null);

  useEffect(() => {
    const fetchMakeup = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/makeup/${id}/`);
        const data = await response.json();
        setMakeup(data);
      } catch (error) {
        console.error('Error fetching makeup item:', error);
      }
    };
    fetchMakeup();
  }, [id]);

  if (!makeup) return <p className="text-center mt-10">Loading makeup item...</p>;

  return (
    <div
      className="makeup"
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        margin: '20px auto',
        borderRadius: '10px',
        maxWidth: '600px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'blanchedalmond',
      }}
    >
      <p><strong>Name:</strong> {makeup.name}</p>
      <p><strong>Description:</strong> {makeup.description}</p>
      <p><strong>Price:</strong> {makeup.price}</p>

      <img
        src={`${makeup.image}`}
        alt={makeup.name}
        style={{
          width: '200px',
          height: 'auto',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      />

      <a
        href="https://wa.me/+201006601966"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: '20px',
          color: 'purple',
          fontWeight: 'bold',
          textDecoration: 'underline',
        }}
      >
        Book via WhatsApp
      </a>
    </div>
  );
}
