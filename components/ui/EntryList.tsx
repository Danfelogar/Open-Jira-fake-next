import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from "@mui/material"
import { grey } from "@mui/material/colors"
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./EntryCard"
import { EntriesContext } from '../../context/entries/EntreiesContext';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status),[entries]);

    const allowDrop = ( e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const onDropEntry =(e: DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text');
        //console.log({ id })
        const entry = entries.find(entry => entry._id === id)!;
        //or
        //if(entry === undefined) return;
        entry.status = status;
        updateEntry( entry );
        endDragging();
    }

    return (
        //TODO: Aqui haremos drop
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', background: 'transparent', padding: '3px 5px', '&::-webkit-scrollbar': { display: 'none' }, backgroundColor: grey[800] }}>

                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
                    {
                        entriesByStatus.map(entry => (
                        <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
