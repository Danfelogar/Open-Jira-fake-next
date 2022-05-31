import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props> = ({ entry }) => {

    const { endDragging, startDragging }= useContext(UIContext);

    const onDragStart = (e: DragEvent) => {
        //Modificar el estado haciendo drag
        e.dataTransfer.setData('text', entry._id);

        startDragging();
    }

    const onDragEnd = (e: DragEvent) => {
        //Modificar el estado haciendo drag
        endDragging();
    }

    return (
        <Card
            sx={{ marginBottom: 1, }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }} variant='subtitle1'>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display:'flex', justifyContent: 'end', paddingRight: 2, }}>
                    <Typography variant='inherit'>creado hace 20 min</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
