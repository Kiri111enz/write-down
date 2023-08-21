import React, { useContext } from 'react';
import { IconButton, Paper, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Note } from 'stores/domain/NotesStore';
import { AppContext } from 'App';

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    const { notesStore } = useContext(AppContext);

    return (
        <Paper sx={{ p: 2 }} role="button" className="d-flex flex-row align-items-baseline">
            <div>
                <Typography variant="h5">{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </div>
            <IconButton sx={{ ml: 'auto' }} onClick={() => notesStore.deleteNote(note.id)}>
                <Delete />
            </IconButton>
        </Paper>
    );
};

export default NoteCard;