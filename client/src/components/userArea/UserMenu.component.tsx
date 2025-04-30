import * as React from 'react';
import { useAuth } from '../../services/auth.provider';
import Profile from './Profile.component';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const UserMenu: React.FC = () => {
    const { user } = useAuth();
    return (
        <>
            {user ?(<Profile/> ): (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/signup">
            <Button variant="contained">הרשמה</Button>
          </Link>
          <Link to="/signin">
            <Button variant="outlined">כניסה</Button>
          </Link>
        </div>
      )}
      </> 
  );
}
export default UserMenu;
