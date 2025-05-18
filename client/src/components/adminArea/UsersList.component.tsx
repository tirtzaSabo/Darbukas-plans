import { Paper, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../services/auth.provider';
import { User } from '../../models/user.model';
import { userService } from '../../services/user.service';

const UsersList: React.FC = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<User[]>([]);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userService.getAllUsers(user?.token);
        if (users) {
          setRows(users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [user?.token]);

  const handleDelete = async (id: string) => {
    try {
      await userService.deleteUser(id, user?.token);
      setRows(rows.filter((row) => row._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (id: string) => {
    setEditRowId(id);
    const userToEdit = rows.find((row) => row._id === id);
    if (userToEdit) {
      setUpdatedUser(userToEdit);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updated = await userService.updateUser(id, updatedUser, user?.token);
      setRows(rows.map((row) => (row._id === id ?{ ...row,...updated} : row)));
      setEditRowId(null);
      setUpdatedUser({});
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setUpdatedUser({});
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'שם',
      width: 150,
      renderCell: (params) =>
        editRowId === params.row._id ? (
          <TextField
            value={updatedUser.name || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
            variant="outlined"
            size="small"
            inputProps={{ maxLength: 100 }}
          />
        ) : (
          params.value
        ),
    },
    {
      field: 'phone',
      headerName: 'טלפון',
      width: 130,
      renderCell: (params) =>
        editRowId === params.row._id ? (
          <TextField
            value={updatedUser.phone || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
            variant="outlined"
            size="small"
          />
        ) : (
          params.value
        ),
    },
    {
      field: 'email',
      headerName: 'אימייל',
      width: 200,
      renderCell: (params) =>
        editRowId === params.row._id ? (
          <TextField
            value={updatedUser.email || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            variant="outlined"
            size="small"
          />
        ) : (
          params.value
        ),
    },
    {
      field: 'role',
      headerName: 'תפקיד',
      width: 130,
      renderCell: (params) =>
        editRowId === params.row._id ? (
          <TextField
            value={updatedUser.role || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
            variant="outlined"
            size="small"
          />
        ) : (
          params.value
        ),
    },
    {
      field: 'actions',
      headerName: 'פעולות',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          {editRowId === params.row._id ? (
            <>
              <IconButton
                onClick={() => handleUpdate(params.row._id)}
                color="primary"
                aria-label="save"
              >
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancelEdit} color="secondary" aria-label="cancel">
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                onClick={() => handleEdit(params.row._id)}
                color="primary"
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(params.row._id)}
                color="secondary"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </>
      ),
    },
  ];

  const paginationModel = { page: 0 };

  return (
    <div>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{ pagination: { paginationModel } }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default UsersList;
