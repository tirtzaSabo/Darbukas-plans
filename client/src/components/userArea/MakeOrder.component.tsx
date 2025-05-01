import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AgeGroups from '../../models/ages.enum';

import {
    TextField,
    MenuItem,
    Button,
    Typography,
    Slider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { eventService } from "../../services/event.service";
import { EventStatus } from '../../models/status.enum';
import { Event1 } from '../../models/event.model';
import { useAuth } from '../../services/auth.provider';

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
    const handleSliderChange = (event: any, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setDuration(newValue);
        }
    };
    // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    // const handleDateChange = (newValue: any) => {
    //     setSelectedDate(newValue ? new Date(newValue) : null);
    // };
    useEffect(() => {
        const fetchServices = async () => {
            const api = axios.create();
            const arr: string[] = [];
            try {
                const services = await api.get(`${config.api}/service?business_id=1`);
                console.log(services + "hello");
                if (services) {
                    services.data.forEach((i: { type: string }) => {
                        arr.push(i.type);
                    });
                }
                // setMeetType(arr);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log("Form Data:", Object.fromEntries(formData.entries()));
        // שליפת ערכים מהטופס (שדות שנשלחים על ידי TextField)
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
            user:user!._id,
            duration: durationInMinutes,
            description,
            status: EventStatus.PENDING,
        };

        try {
            console.log(newEvent);
            
            const event = await eventService.createEvent(newEvent,user?.token);
            console.log(event);

        } catch (error) {
            console.error("Failed to create event:", error);
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
                            <MenuItem key={'in'} value={'פנים'}>
                                {'פנים'}
                            </MenuItem>
                            <MenuItem key={'out'} value={'חוץ'}>
                                {'חוץ'}
                            </MenuItem>
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
                        {/* <TextField
                            label="כמה זמן?"
                            name="duration"
                            type="range"
                            inputProps={{
                                step: 30,
                                min: 30,
                                max:180,
                                defaultValue: 50
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        /> */}
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="בחר תאריך ושעה"
                                value={selectedDate}
                                onChange={handleDateChange}
                            // renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                            />
                        </LocalizationProvider> */}
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
            </Container>
        </ThemeProvider>
    );
};

export default MakeOrder;
