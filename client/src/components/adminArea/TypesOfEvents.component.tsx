import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Button, Box, Typography } from '@mui/material';
import { EventType } from '../../models/eventType.model';
import { eventTypeService } from '../../services/eventType.service';
import { useAuth } from '../../services/auth.provider';

const TypesOfEvents: React.FC = () => {
  const { user } = useAuth();
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [newEventType, setNewEventType] = useState<string>(''); // שדה לאחסון שם סוג האירוע החדש
  const [feedback, setFeedback] = useState<string | null>(null); // הודעה למשתמש
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null); // סוג אירוע שנערך

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const types = await eventTypeService.getAllEventTypes(user?.token);
        if (types) {
          setEventTypes(types);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [user?.token]);

  const handleAddEventType = async () => {
    if (!newEventType.trim()) {
      setFeedback('נא להזין שם לסוג האירוע.');
      return;
    }
    try {
      const createdEventType = await eventTypeService.createEventType(
        { description: newEventType.trim() },
        user?.token
      );
      setEventTypes([...eventTypes, createdEventType]);
      setFeedback('סוג האירוע נוסף בהצלחה!');
      setNewEventType('');
    } catch (error) {
      console.error('Error adding event type:', error);
      setFeedback('שגיאה בהוספת סוג האירוע.');
    }
  };

  const handleDeleteEventType = async (id: string) => {
    try {
      await eventTypeService.DeleteEventType(id, user?.token);
      setEventTypes(eventTypes.filter((event) => event._id !== id));
      setFeedback('סוג האירוע נמחק בהצלחה!');
    } catch (error) {
      console.error('Error deleting event type:', error);
      setFeedback('שגיאה במחיקת סוג האירוע.');
    }
  };

  const handleEditEventType = async () => {
    if (!editingEvent || !newEventType.trim()) {
      setFeedback('נא להזין שם חדש לסוג האירוע.');
      return;
    }
    try {
      const updatedEvent = await eventTypeService.UpdateEventType(
        editingEvent._id!,
        { description: newEventType.trim() },
        user?.token
      );
     setEventTypes(
  eventTypes.map((event) =>
    event._id === editingEvent?._id ? { ...event, ...updatedEvent } : event
  )
);

      setFeedback('סוג האירוע עודכן בהצלחה!');
      setEditingEvent(null);
      setNewEventType('');
    } catch (error) {
      console.error('Error updating event type:', error);
      setFeedback('שגיאה בעדכון סוג האירוע.');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        סוגי אירועים
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mb: 2 }}>
        {eventTypes.map((value, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText primary={value.description} />
            <IconButton
              aria-label="edit"
              onClick={() => {                
                setEditingEvent(value);
                setNewEventType(value.description);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteEventType(value._id!)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label={
            editingEvent ? 'ערוך את סוג האירוע' : 'שם סוג האירוע החדש'
          }
          variant="outlined"
          value={newEventType}
          onChange={(e) => setNewEventType(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editingEvent ? handleEditEventType : handleAddEventType}
        >
          {editingEvent ? 'עדכן' : 'הוסף'}
        </Button>
      </Box>
      {feedback && (
        <Typography
          sx={{ mt: 2, color: feedback.includes('שגיאה') ? 'red' : 'green' }}
        >
          {feedback}
        </Typography>
      )}
    </Box>
  );
};

export default TypesOfEvents;
