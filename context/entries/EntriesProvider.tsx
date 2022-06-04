import { FC, ReactNode, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../api';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}

interface Props {
    children: ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider:FC<Props>= ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE );

    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async(description: string) => {
        // const newEntry: Entry = {
        //     _id :   uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending',
        // }

        const { data } = await entriesApi.post<Entry>('/entries',{
            description,
        });

        dispatch({ type: '[Entry] - add entry', payload: data })
    }

    const updateEntry = async({_id, description, status}: Entry, showSnackbar = false) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`,{
                description,
                status,
            });

            //Mostrar snackbar notification
            if( showSnackbar ) {
                enqueueSnackbar('Entry updated',{
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                });
            }


            dispatch({ type: '[Entry] - Entry-Update', payload: data });
        } catch (e) {
            console.log({ e })
        }
    }

    const deleteEntry = async( _id : string, showSnackbar = false) => {

        try {
            const  res  = await entriesApi.delete(`/entries/${_id}`);
            console.log({ res })
            if( showSnackbar ) {
                enqueueSnackbar('Entry deleted',{
                    variant: 'error',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    }
                });
            }


            dispatch({ type: '[Entry] - Entry-Delete', payload: _id });
        } catch (e) {
            console.log({ e })
        }
    }

    const refreshEntries = async()=>{
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - Refresh-Data', payload: data });
    }

    useEffect(() => {

        refreshEntries();

    }, [])

    return(
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};