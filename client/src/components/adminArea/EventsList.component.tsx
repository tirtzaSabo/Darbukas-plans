import { Paper, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { eventService } from '../../services/event.service';
import { userService } from '../../services/user.service';
import { useAuth } from '../../services/auth.provider';
import { Event1 } from '../../models/event.model';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const EventList: React.FC = () => {
    const { user } = useAuth();
    const [rows, setRows] = useState<Event1[]>([]);
    const [usersMap, setUsersMap] = useState<Record<string, string>>({});
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await eventService.gatAllEvents(user?.token);
                if (events) {
                    setRows(events);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const users = await userService.getAllUsers(user?.token);
                if (users) {
                    const map = users.reduce((acc: Record<string, string>, u) => {
                        acc[u._id] = u.name;
                        return acc;
                    }, {});
                    setUsersMap(map);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchEvents();
        fetchUsers();
    }, [user?.token]);

    const handleEditClick = (id: string) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = async (id: string) => {
        try {
            const updatedEvent = rows.find((row) => row._id === id);
            if (updatedEvent) {
                await eventService.updateEvent(id, updatedEvent, user?.token);
            }
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await eventService.deleteEvent(id, user?.token);
            setRows(rows.filter((row) => row._id !== id));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleCancelClick = (id: string) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
    };

    const processRowUpdate = (newRow: Event1) => {
        setRows(rows.map((row) => (row._id === newRow._id ? newRow : row)));
        return newRow;
    };
const columns: GridColDef[] = [
    { field: 'age', headerName: 'גילאים', width: 130, editable: true },
    // { field: 'numOfParticipants', headerName: 'מספר משתתפים', type: 'number', width: 130, editable: true },
    {
    field: 'date',
    headerName: 'תאריך ושעה',
    type: 'string',
    width: 200,
    editable: true,
    valueGetter: (params) => {
        const date = new Date(params);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    },
},
    { field: 'place', headerName: 'Place', width: 130, editable: true },
    { field: 'service', headerName: 'Service', width: 130, editable: true },
    {
        field: 'user',
        headerName: 'לקוח',
        width: 130,
        valueGetter: (params) => usersMap[params] || 'Unknown',
    },
    { field: 'description', headerName: 'תאור', width: 200, editable: true },
    { field: 'status', headerName: 'Status', width: 130, editable: true },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => {
            const isInEditMode = rowModesModel[params.row._id]?.mode === GridRowModes.Edit;
            return isInEditMode ? (
                <>
                    <IconButton onClick={() => handleSaveClick(params.row._id)} color="primary">
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancelClick(params.row._id)} color="secondary">
                        <CloseIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    <IconButton onClick={() => handleEditClick(params.row._id)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row._id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </>
            );
        },
    },
];

    return (
        <div>
            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row._id}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowEditStop={(params) => processRowUpdate(params.row)}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
};

export default EventList;
