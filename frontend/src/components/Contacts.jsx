import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Contacts = () => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 4,
        textAlign: 'center',
        backgroundColor: '#fef5f8',
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: '#d81b60', fontWeight: 'bold' }}>
        Contact Us
      </Typography>

      <Typography variant="body1" sx={{ fontSize: 18, mb: 2 }}>
        We'd love to hear from you! Reach out to us for product inquiries, custom kits, or collaborations.
      </Typography>

      <Typography variant="body1" sx={{ fontSize: 18 }}>
        📞 Phone:{' '}
        <Link href="tel:+201006601966" underline="hover">
          +20 100 660 1966
        </Link>
      </Typography>

      <Typography variant="body1" sx={{ fontSize: 18 }}>
        📧 Email:{' '}
        <Link href="mailto:support@elixirbeauty.com" underline="hover">
          support@elixirbeauty.com
        </Link>
      </Typography>

      <Typography variant="body1" sx={{ fontSize: 18 }}>
        📍 Locations:
        <br />
        • Cairo, Egypt
        <br />
        • Dubai, United Arab Emirates
      </Typography>

      <Box mt={3}>
        <Link
          href="https://wa.me/+201006601966"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-block',
            backgroundColor: '#25D366',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: '#1ebe5d',
            },
          }}
        >
          💬 Chat on WhatsApp
        </Link>
      </Box>
    </Box>
  );
};

export default Contacts;
