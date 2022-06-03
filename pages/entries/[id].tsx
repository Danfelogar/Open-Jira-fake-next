import { ChangeEvent, useState } from 'react';
import { capitalize, Card, Grid, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from '../../components/layouts/Layout';
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus);
    }

    const onSave = ( ) => {
        console.log({ inputValue, status });
    }

    return (
        <Layout title="... .... ...">
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader
                            title={`Entry: ${inputValue}`}
                            subheader={`Creada hace: .... minutos`}
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
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>

        </Layout>
    )
}

export default EntryPage;