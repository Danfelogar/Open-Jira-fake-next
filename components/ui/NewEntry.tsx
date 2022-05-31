import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries/EntreiesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);
    const { addingComponent, changeAddingComponent } = useContext(UIContext);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }


    const onSave = () => {
        if(inputValue.length === 0) return;
        addNewEntry(inputValue);
        changeAddingComponent();
        setTouched(false);
        setInputValue('');
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX:1 }}>
            {
                addingComponent ?(
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1, }}
                            placeholder='New Entry'
                            autoFocus
                            multiline
                            label='New Entry'
                            helperText={ touched && inputValue.length <= 0 && 'Please enter a value' }
                            error={ touched && inputValue.length <= 0 }
                            value={inputValue}
                            onChange={ onTextFieldChanged }
                            onBlur={ () => setTouched(true) }
                        />

                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='text'
                                color='secondary'
                                sx={{
                                    marginBottom: 2,
                                }}
                                onClick={changeAddingComponent}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant='outlined'
                                color='primary'
                                endIcon={<SaveOutlinedIcon />}
                                sx={{
                                    marginBottom: 2,
                                }}
                                onClick={onSave}
                            >
                                Save
                            </Button>
                        </Box>
                    </>
                ):(
                    <Button
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        fullWidth
                        variant='outlined'
                        onClick={changeAddingComponent}
                    >
                        Add TODO
                    </Button>
                )
            }

        </Box>
    )
}
