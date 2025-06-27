import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SpaIcon from '@mui/icons-material/Spa';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import BrushIcon from '@mui/icons-material/Brush';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import logo from './ELIXIR.jpg'; // Make sure this path is correct

export default function Navbar({ content }) {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('Token');

  const logoutUser = () => {
    AxiosInstance.post('logoutall/')
      .then(() => {
        localStorage.removeItem('Token');
        navigate('/');
        window.location.reload();
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ backgroundColor: 'red' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo & Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={logo} alt="Elixir Logo" style={{ width: 40, height: 40 }} />
            <Typography variant="h6" sx={{ color: 'gold' }}>ELIXIR</Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {/* Always Visible */}
            <Button
              component={Link}
              to="/"
              startIcon={<SpaIcon sx={{ color: 'gold' }} />}
              sx={{ color: 'gold', fontWeight: path === '/' ? 'bold' : 'normal' }}
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/about"
              startIcon={<FaceRetouchingNaturalIcon sx={{ color: 'gold' }} />}
              sx={{ color: 'gold', fontWeight: path === '/about' ? 'bold' : 'normal' }}
            >
              About
            </Button>

            {/* Only if NOT logged in */}
            {!isLoggedIn && (
              <>
                <Button
                  component={Link}
                  to="/login"
                  startIcon={<LoginIcon sx={{ color: 'gold' }} />}
                  sx={{ color: 'gold', fontWeight: path === '/login' ? 'bold' : 'normal' }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  startIcon={<PersonAddAlt1Icon sx={{ color: 'gold' }} />}
                  sx={{ color: 'gold', fontWeight: path === '/register' ? 'bold' : 'normal' }}
                >
                  Register
                </Button>
              </>
            )}

            {/* Only if logged in */}
            {isLoggedIn && (
              <>
                <Button
                  component={Link}
                  to="/makeup"
                  startIcon={<BrushIcon sx={{ color: 'gold' }} />}
                  sx={{ color: 'gold', fontWeight: path === '/makeup' ? 'bold' : 'normal' }}
                >
                  Make-up
                </Button>

                <Button
                  component={Link}
                  to="/bundles"
                  startIcon={<AutoAwesomeIcon sx={{ color: 'gold' }} />}
                  sx={{ color: 'gold', fontWeight: path === '/bundles' ? 'bold' : 'normal' }}
                >
                  Bundles
                </Button>

                <Button
                  component={Link}
                  to="/offers"
                  startIcon={<LocalOfferIcon sx={{ color: 'gold' }} />}
                  sx={{ color: 'gold', fontWeight: path === '/offers' ? 'bold' : 'normal' }}
                >
                  Offers
                </Button>

                <Button
                  component={Link}
                  to="/cosmetics"
                  startIcon={<FavoriteIcon sx={{ color: 'gold' }} />}
                  sx={{ color: 'gold', fontWeight: path === '/cosmetics' ? 'bold' : 'normal' }}
                >
                  Cosmetics
                </Button>

                <Button
                  component={Link}
                  to="/admin"
                  startIcon={<SettingsIcon sx={{ color: 'gold' }} />}
                  sx={{ color: 'gold', fontWeight: path === '/admin' ? 'bold' : 'normal' }}
                >
                  Admin
                </Button>

                <Button
                  onClick={logoutUser}
                  startIcon={<LogoutIcon sx={{ color: 'gold' }} />}
                  sx={{ color: 'gold', fontWeight: 'bold' }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content Below Navbar */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {content}
      </Box>
    </Box>
  );
}
