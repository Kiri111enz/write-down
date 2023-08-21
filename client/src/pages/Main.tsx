import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from '@mui/material';
import { AppContext } from 'App';
import NoteCard from 'components/NoteCard';

const Main: React.FC = observer(() => {
    const { notesStore } = useContext(AppContext);

    return (
        <Grid container spacing={3}>
            {notesStore.notes?.map(note => (
                <Grid item key={note.id}>
                    <NoteCard key={note.id} note={note} />
                </Grid>
            ))}
        </Grid>
    );
});

export default Main;