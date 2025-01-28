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
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from '../../services/axios';
import config from "../../config";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

// const defaultTheme = createTheme();

const SignUp: React.FC = () => {
    const nav = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const cookies = new Cookies();
        const name = data.get('name') as string;
        const password = data.get('password') as string;
        const phone = data.get('phone') as string;
        const email = data.get('email') as string;
        try {
            const res = await Axios.post(`${config.api}/users/signup`, { name, password, phone, email });
            console.log(res.status);

            if (res.status === 200) {
                console.log("200");

                const { manager, name } = res.data;

                if (!res.data) {
                    alert('Name or password is incorrect');
                    return;
                }

                cookies.set('isAdmin', manager ? 'true' : 'false');
                cookies.set('name', name);

                if (manager) {
                    nav('/admin');
                } else {
                    nav('/');
                }
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <>
            {/* <ThemeProvider theme={defaultTheme}> */}
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
                        Sign up
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="זכור אותי"
                        />
                        <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
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
            {/* </ThemeProvider> */}
        </>
    );
};

export default SignUp;
