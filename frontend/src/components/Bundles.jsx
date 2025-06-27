import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';

export default function Bundles() {
  const [bundleData, setBundleData] = useState({
    title: '',
    product_id: '',
    offer_price: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setBundleData(prev => ({ ...prev, image: files[0] }));
    } else {
      setBundleData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const submitted = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});

    const formData = new FormData();
    Object.entries(bundleData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await fetch('http://127.0.0.1:8000/api/bundles/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('✅ Your bundle has been submitted!');
        setBundleData({
          title: '',
          product_id: '',
          offer_price: '',
          image: null,
        });
      } else {
        setErrors(data);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setErrors({ non_field: 'Network error – please try again later.' });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitted}
      sx={{
        backgroundColor: 'darkred',
        color: 'gold',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        borderRadius: 2,
        width: '80%',
        m: '20px auto',
        '& > :not(style)': { m: 1, width: '60%' },
      }}
      noValidate
      autoComplete="off"
      encType="multipart/form-data"
    >
      {errors.non_field && <Alert severity="error">{errors.non_field}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        name="title"
        label="Title"
        variant="outlined"
        value={bundleData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title?.[0]}
      />

      <TextField
        name="product_id"
        label="Product ID"
        variant="outlined"
        value={bundleData.product_id}
        onChange={handleChange}
        error={!!errors.product_id}
        helperText={errors.product_id?.[0]}
      />

      <TextField
        name="offer_price"
        label="Offer Price"
        variant="outlined"
        value={bundleData.offer_price}
        onChange={handleChange}
        error={!!errors.offer_price}
        helperText={errors.offer_price?.[0]}
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        style={{ marginTop: 10, color: 'white' }}
      />

      {errors.image && <Alert severity="error">{errors.image[0]}</Alert>}

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit New Bundle
      </Button>
    </Box>
  );
}
