import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Note } from 'stores/domain/NotesStore';

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    return (
        <Paper sx={{ p: 2 }} role="button">
            <Typography variant="h5">{note.title}</Typography>
            <Typography>{note.text}</Typography>
        </Paper>
    );
};

export default NoteCard;