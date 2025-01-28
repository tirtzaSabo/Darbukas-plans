import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AgeGroups from '../../models/ages.enum';

import {
    FormControl,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const defaultTheme = createTheme();
const MakeOrder: React.FC = () => {
    const [ageGroup, setAgeGroup] = useState<AgeGroups | ''>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAgeGroup(event.target.value as AgeGroups);
    };


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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log("Form Data:", Object.fromEntries(data.entries()));
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
                            // value={ageGroup}
                            // onChange={handleChange}
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
                        >
                            {Object.values(AgeGroups).map((value) => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="מספר משתמשים"
                            type="number"
                            // value={value}
                            // onChange={handleChange}
                            inputProps={{
                                step: 50,
                                min: 50,
                                defaultValue:50
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker />
                        </LocalizationProvider>
                        <TextField
                            label="...ספרי לנו עוד"
                            name="comment"
                            fullWidth
                        />
                        {/* <TextField
                        type='Date'
                            name="date"
                            fullWidth
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default MakeOrder;
