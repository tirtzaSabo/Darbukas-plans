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
import Alert from '@mui/material/Alert';

const SignUp: React.FC = () => {
    const nav = useNavigate();
    const { login } = useAuth();

    const [errors, setErrors] = React.useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        general: '', // לשגיאות כלליות
    });

    const validate = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (!value) return 'שם נדרש.';
                if (value.trim().length < 2) return 'שם חייב להיות באורך של לפחות 2 תווים.';
                break;
            case 'phone':
                if (!value) return 'טלפון נדרש.';
                if (!/^[0-9]{10}$/.test(value)) return 'מספר טלפון לא תקין.';
                break;
            case 'email':
                if (!value) return 'מייל נדרש.';
                if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) return 'כתובת מייל לא תקינה.';
                break;
            case 'password':
                if (!value) return 'סיסמא נדרשת.';
                if (value.length < 6) return 'סיסמא חייבת להיות באורך של לפחות 6 תווים.';
                break;
            default:
                break;
        }
        return '';
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get('name') as string;
        const phone = data.get('phone') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        const newErrors = {
            name: validate('name', name),
            phone: validate('phone', phone),
            email: validate('email', email),
            password: validate('password', password),
            general: '',
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) return;

        try {
            const user = await userService.signup(name, password, phone, email);
            if (user) {
                login(user);
                nav('/');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ...error.response.data.errors,
                }));
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    general: 'שגיאה לא צפויה התרחשה. נסה שוב מאוחר יותר.',
                }));
                console.error('Error signing up:', error);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                <Typography component="h1" variant="h5">
                    הרשמה
                </Typography>
                {errors.general && <Alert severity="error">{errors.general}</Alert>}
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
                        error={!!errors.name}
                        helperText={errors.name}
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
                        error={!!errors.email}
                        helperText={errors.email}
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
                        error={!!errors.phone}
                        helperText={errors.phone}
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
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <a href="/signin">התחבר</a>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        הרשם
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
