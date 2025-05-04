import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../../App.css';
import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import UserMenu from './UserMenu.component';
import Box from '@mui/material/Box';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header>
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '1200px',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ flex: 1 }} />

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  label="צור קשר"
                  style={{
                    color: isActive('/contact') ? '#1976d2' : 'gray',
                  }}
                  onClick={() => navigate('/contact')}
                />
                <BottomNavigationAction
                  label="הזמנת אירוע"
                  style={{
                    color: isActive('/makeOrder') ? '#1976d2' : 'gray',
                  }}
                  onClick={() => navigate('/makeOrder')}
                />
                <BottomNavigationAction
                  label="אודות"
                  style={{
                    color: isActive('/home') ? '#1976d2' : 'gray',
                  }}
                  onClick={() => navigate('/home')}
                />
              </BottomNavigation>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <UserMenu />
            </Box>
          </Box>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
