import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Note } from 'stores/domain/NotesStore';

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    return (
        <Card>
            <CardHeader title={note.title} />
            <CardContent>
                <Typography>{note.text}</Typography>
            </CardContent>
        </Card>
    );
};

export default NoteCard;