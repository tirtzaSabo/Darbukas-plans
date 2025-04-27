import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth.provider';
import { userService } from '../../services/user.service';


const SignIn: React.FC = () => {
    const nav = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        try {
            const user = await userService.signin(password, email);
            if (user) {
                login(user);
                nav('/');
            }

        } catch (error) {
            console.error('Error signing in:', error);
            alert('An error occurred during sign in. Please try again.');
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                    <Typography component="h1" variant="h5">התחברות</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="מייל"
                            type="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="סיסמא"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <a href='/signup'>עדיין לא נרשמת? הרשם</a>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            התחבר
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default SignIn;
