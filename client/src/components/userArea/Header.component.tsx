// import { Outlet, useNavigate } from 'react-router-dom';
// import '../../App.css';
// import React from 'react';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import EqualizerIcon from '@mui/icons-material/Equalizer';
// // import ThermostatIcon from '@mui/icons-material/Thermostat';
// // import CloseIcon from '@mui/icons-material/Close';

// const Header: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <header>
//         <nav>
//           <BottomNavigation
//             sx={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               right: 0,
//               zIndex: 999,
//               backgroundColor: '#ffffff',
//             }}
//             showLabels
            
//           >
//             <BottomNavigationAction
//               label="Sign-In"
//               style={{ color: '#1976d2' }}
//               onClick={() => navigate('/signin')}
//             />
//             {/* <BottomNavigationAction
//               label="Subscription"
//               // icon={<FavoriteIcon />}
//               style={{ color: '#1976d2' }}
//               onClick={() => navigate('/about')}
//             /> */}
//             <BottomNavigationAction
//               label="To Make Order"
//               style={{ color: '#1976d2' }}
//               onClick={() => navigate('/makeOrder')}
//             />
//             {/* <BottomNavigationAction
//               label="Contact"
//               // icon={<ContactSupportIcon />}
//               style={{ color: '#1976d2' }}
//               onClick={() => navigate('/contact')}
//             />
//             <BottomNavigationAction
//               label="Schedule"
//               // icon={<CalendarMonthIcon />}
//               style={{ color: '#1976d2' }}
//               onClick={() => navigate('/schedule')}
//             />
//             <BottomNavigationAction
//               label="Satisfaction"
//               // icon={<EqualizerIcon />}
//               style={{ color: '#1976d2' }}
//               onClick={() => navigate('/satisfaction')}
//             /> */}
//             <BottomNavigationAction
//               label="About"
//               style={{ color: '#1976d2' }}
//               onClick={() => navigate('/home')}
//             />
//             {/* {isManager && <BottomNavigationAction
//               label="Management"
//               style={{ color: '#1976d2' }}
//               onClick={() => handleNavigation('/management')}
//             />} */}
//           </BottomNavigation>
//           <Outlet />
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Header;
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../../App.css';
import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header>
        <nav>
          <BottomNavigation
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 999,
              backgroundColor: '#ffffff',
            }}
            showLabels
          >
            <BottomNavigationAction
              label="Sign-In"
              style={{
                color: isActive('/signin') ? '#1976d2' : 'gray',
              }}
              onClick={() => navigate('/signin')}
            />
            <BottomNavigationAction
              label="To Make Order"
              style={{
                color: isActive('/makeOrder') ? '#1976d2' : 'gray',
              }}
              onClick={() => navigate('/makeOrder')}
            />
            <BottomNavigationAction
              label="About"
              style={{
                color: isActive('/home') ? '#1976d2' : 'gray',
              }}
              onClick={() => navigate('/home')}
            />
          </BottomNavigation>
          <Outlet />
        </nav>
      </header>
    </>
  );
};

export default Header;
