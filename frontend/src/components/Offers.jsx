import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Input } from '@mui/material';

export default function Offers() {
  const [offersData, setOffersData] = useState({
    title: '',
    description: '',
    discount_percent: '',
    valid_until: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffersData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submitted = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});

    try {
      const formData = new FormData();
      for (const key in offersData) {
        formData.append(key, offersData[key]);
      }
      formData.append('discount_percent', Number(offersData.discount_percent));
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch('http://127.0.0.1:8000/api/offers/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Your offer has been submitted!');
        setOffersData({
          title: '',
          description: '',
          discount_percent: '',
          valid_until: '',
        });
        setImageFile(null);
      } else {
        setErrors(data);
        console.error('Backend validation error:', data);
      }
    } catch (err) {
      console.error('Network error:', err);
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
        value={offersData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title?.[0]}
      />

      <TextField
        name="description"
        label="Description"
        variant="filled"
        value={offersData.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description?.[0]}
      />

      <TextField
        name="discount_percent"
        label="Discount Percent"
        type="number"
        variant="outlined"
        value={offersData.discount_percent}
        onChange={handleChange}
        error={!!errors.discount_percent}
        helperText={errors.discount_percent?.[0]}
      />

      <TextField
        name="valid_until"
        label="Valid Until"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={offersData.valid_until}
        onChange={handleChange}
        error={!!errors.valid_until}
        helperText={errors.valid_until?.[0]}
      />

      <Input
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={handleImageChange}
        sx={{ mt: 1 }}
      />
      {errors.image && <Alert severity="error">{errors.image?.[0]}</Alert>}

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Make New Offer
      </Button>
    </Box>
  );
}
