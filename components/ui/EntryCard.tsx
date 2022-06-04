import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props> = ({ entry }) => {

    const { endDragging, startDragging }= useContext(UIContext);

    const router = useRouter();

    const onDragStart = (e: DragEvent) => {
        //Modificar el estado haciendo drag
        e.dataTransfer.setData('text', entry._id);

        startDragging();
    }

    const onDragEnd = (e: DragEvent) => {
        //Modificar el estado haciendo drag
        endDragging();
    }

    const oncCLickNav = () => {
        router.push(`/entries/${entry._id}`);
    };
    console.log(entry.createdAt);
    return (
        <Card
            sx={{ marginBottom: 1, }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={oncCLickNav}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }} variant='subtitle1'>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display:'flex', justifyContent: 'end', paddingRight: 2, }}>
                    <Typography variant='inherit'>{ dateFunctions?.getFormatDistanceToNow( entry?.createdAt ) }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
