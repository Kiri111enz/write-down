import { useContext } from 'react';
import { Paper } from '@mui/material';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { AppStoreContext } from 'App';
import NotesStore from 'stores/domain/NotesStore';

const Main: React.FC = observer(() => {
    const appStore = useContext(AppStoreContext);
    const notesStore = useLocalObservable<NotesStore>(() => appStore.notesStore);

    return (
        <div className="vw-100">
            {notesStore.notes?.map(note => <Paper key={note.id} elevation={2}>{note.text}</Paper>)}
        </div>
    );
});

export default Main;