import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { capitalize, Card, Grid, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts/Layout';
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry;
}

const EntryPage: FC<Props> = ({entry}) => {

    const { updateEntry, deleteEntry } = useContext(EntriesContext);

    const router = useRouter();

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus);
    }

    const onSave = ( ) => {
        if( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        }

        updateEntry( updatedEntry, true );
    }

    const onDelete = () => {
        deleteEntry( entry._id, true );
        router.push('/');
    }

    return (
        <Layout title={ inputValue.substring(0,20) + '...' }>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader
                            title={`Entry:`}
                            subheader={`Create at: ${dateFunctions.getFormatDistanceToNow( entry.createdAt )}`}
                        />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 2 }}
                                fullWidth
                                placeholder='New Entry'
                                autoFocus
                                multiline
                                label='New Entry'
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                onBlur={() => setTouched(true)}
                                helperText={isNotValid && 'Entry is required'}
                                error={isNotValid }
                            />

                            <FormControl>
                                <FormLabel>STATE:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
        	                        {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                fullWidth
                                variant='contained'
                                onClick={onSave}
                                disabled={inputValue.length <= 0 }
                            >
                                SAVE
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>

            <IconButton
                sx={{ position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark',
            }}
                onClick={onDelete}
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>

        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    //peticion al backend de forma directa

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if( !entry ){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry: entry,
        }
    }
}

export default EntryPage;