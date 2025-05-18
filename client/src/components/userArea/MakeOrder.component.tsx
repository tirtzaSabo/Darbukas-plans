import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, MenuItem, Button, Typography, Slider, Snackbar, Alert } from '@mui/material';
import { eventService } from "../../services/event.service";
import { eventTypeService } from "../../services/eventType.service";
import { EventStatus } from '../../models/status.enum';
import { Event1 } from '../../models/event.model';
import { useAuth } from '../../services/auth.provider';
import AgeGroups from '../../models/ages.enum';

const marks = [
    { value: 0.5, label: 'חצי שעה' },
    { value: 1, label: 'שעה' },
    { value: 1.5, label: '1.5' },
    { value: 2, label: '2' },
    { value: 2.5, label: '2.5' },
    { value: 3, label: '3' },
];

const defaultTheme = createTheme();

const MakeOrder: React.FC = () => {
    const { user } = useAuth();

    const [duration, setDuration] = useState<number>(1);
    const [eventTypes, setEventTypes] = useState<string[]>([]);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error'; }>({ open: false, message: '', severity: 'success' });

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setDuration(newValue);
        }
    };

    useEffect(() => {
        const fetchEventTypes = async () => {
            try {
                const services = await eventTypeService.getAllEventTypes(user!.token);
                if (services) {
                    setEventTypes(services.map(service => service.description));
                }
            } catch (error) {
                console.error("Error fetching event types:", error);
            }
        };

        fetchEventTypes();
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const service = formData.get('service') as string;
        const age = formData.get('age') as string;
        const numOfParticipantsStr = formData.get('NumofParticipants');
        const place = formData.get('place') as string;
        const description = formData.get('description') as string;
        const date = formData.get('date') as unknown as Date;

        const numOfParticipants = Number(numOfParticipantsStr);
        const durationInMinutes = duration * 60;

        const newEvent: Event1 = {
            age: age as AgeGroups,
            numOfParticipants,
            date: date,
            place,
            service,
            user: user!._id,
            duration: durationInMinutes,
            description,
            status: EventStatus.PENDING,
        };

        try {
            await eventService.createEvent(newEvent, user?.token);
            setSnackbar({ open: true, message: 'אירוע נוצר בהצלחה!', severity: 'success' });
        } catch (error: any) {
            console.error("Failed to create event:", error);
            if (error.response?.data?.message === 'Date is already taken') {
                setSnackbar({ open: true, message: 'התאריך תפוס, נסה תאריך אחר.', severity: 'error' });
            } else {
                setSnackbar({ open: true, message: 'אירעה שגיאה ביצירת האירוע.', severity: 'error' });
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        הזמנת אירוע
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            select
                            label="בחר סוג פעילות"
                            name='service'
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        >
                            {eventTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="בחר קבוצת גיל"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            name="age"
                        >
                            {Object.values(AgeGroups).map((value) => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="מספר משתמשים"
                            name="NumofParticipants"
                            type="number"
                            inputProps={{
                                step: 50,
                                min: 50,
                                defaultValue: 50
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="מקום"
                            name="place"
                            fullWidth
                        />
                        <Typography id="duration-slider" gutterBottom>
                            בחרי משך זמן
                        </Typography>
                        <Slider
                            name='duration'
                            value={duration}
                            min={0.5}
                            max={3}
                            step={0.5}
                            marks={marks}
                            onChange={handleSliderChange}
                        />
                        <TextField
                            label="...ספרי לנו עוד"
                            name="description"
                            fullWidth
                        />
                        <TextField
                            type='datetime-local'
                            name="date"
                            fullWidth
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            הזמנה
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default MakeOrder;
