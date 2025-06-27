import * as React from 'react';
import { Box, Typography, Link } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ color: 'red', fontWeight: 'bold' }}>
        About ELIXIR
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontSize: 18 }}>
        Welcome to <strong style={{ color: 'gold' }}>ELIXIR</strong> — the ultimate destination where beauty meets authenticity.
        At ELIXIR, we believe that everyone deserves to feel confident, radiant, and empowered. That’s why we offer
        <strong> 100% original, premium-quality makeup and cosmetic products</strong> made with skin-loving ingredients,
        safe for all skin types and tones.
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontSize: 18 }}>
        Our mission is simple: to redefine beauty standards by celebrating boldness, self-expression, and elegance.
        Whether you're creating a fresh everyday look or full-on glam, ELIXIR adds that magical touch to your beauty ritual
        — helping you shine your way.
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontSize: 18 }}>
        <strong style={{ color: 'gold' }}>Why ELIXIR?</strong>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: '#444' }}>
          <li>🌟 100% Original products — guaranteed authenticity</li>
          <li>🐰 Cruelty-free and ethically made</li>
          <li>💄 Dermatologist-tested and safe for sensitive skin</li>
          <li>✨ Long-lasting, high-pigment formulas</li>
          <li>🎁 Exclusive offers, bundles & custom kits</li>
        </ul>
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontSize: 18 }}>
        Join the <strong style={{ color: 'gold' }}>ELIXIR</strong> community and embrace your natural beauty with confidence.
        Your glow isn’t just seen — it's felt.
        <br />
        <strong>ELIXIR: Beauty, reimagined.</strong>
      </Typography>

      {/* Contact Information */}
      <Box mt={5} sx={{
        backgroundColor: '#fef5f8',
        borderRadius: 4,
        boxShadow: 3,
        p: 3,
        textAlign: 'center'
      }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#d81b60', fontWeight: 'bold' }}>
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
    </Box>
  );
};

export default About;
