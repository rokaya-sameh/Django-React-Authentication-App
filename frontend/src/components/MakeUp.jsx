import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';

export default function Makeup() {
  const [makeupData, setMakeupData] = useState({
    name: '',
    description: '',
    image: null, // Initialize as null for file input
    price: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMakeupData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    setMakeupData((prev) => ({ ...prev, image: e.target.files[0] }));
    setErrors((prev) => ({ ...prev, image: null }));
  };

  const submitted = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});

    // Validate required fields
    const newErrors = {};
    if (!makeupData.name) newErrors.name = 'Name is required';
    if (!makeupData.description) newErrors.description = 'Description is required';
    if (!makeupData.image) newErrors.image = 'Image is required';
    if (!makeupData.price) newErrors.price = 'Price is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    const formData = new FormData();
    Object.entries(makeupData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch('http://127.0.0.1:8000/api/makeup/', {
        method: 'POST',
        body: formData,
        // headers: add Authorization here if needed
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Your makeup product has been submitted!');
        setMakeupData({
          name: '',
          description: '',
          image: null, // Reset to null after submission
          price: '',
        });
      } else {
        setErrors(data);
      }
    } catch (err) {
      setErrors({ non_field: 'Network error – please try again later.' });
      console.error(err);
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
    >
      {errors.non_field && (
        <Alert severity="error">{errors.non_field}</Alert>
      )}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        name="name"
        label="Name"
        variant="outlined"
        value={makeupData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        name="description"
        label="Description"
        variant="filled"
        value={makeupData.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginTop: '16px' }}
      />
      {errors.image && <Alert severity="error">{errors.image}</Alert>}

      <TextField
        name="price"
        label="Price"
        variant="outlined"
        value={makeupData.price}
        onChange={handleChange}
        error={!!errors.price}
        helperText={errors.price}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Make New Makeup Product
      </Button>
    </Box>
  );
}
