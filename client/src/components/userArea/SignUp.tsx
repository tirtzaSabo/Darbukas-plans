import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth.provider';
import { userService } from '../../services/user.service';
const SignUp: React.FC = () => {
    const nav = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name') as string;
        const password = data.get('password') as string;
        const phone = data.get('phone') as string;
        const email = data.get('email') as string;
        try {
            const user = await userService.signup(name, password, phone, email);
            if(user){
                login(user);
                nav('/');
        }
        } catch (error) {
            console.error('Error signing in:', error);
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
                    <Typography component="h1" variant="h5">
                        הרשמה
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="שם"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="מייל"
                            type="email"
                            id="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="טלפון"
                            type="tel"
                            id="phone"
                            autoComplete="phone"
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
                        <a href='/signin'>התחבר</a>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            הרשם
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default SignUp;
