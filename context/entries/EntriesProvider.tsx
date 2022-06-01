import { FC, ReactNode, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../api';

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

    const addNewEntry = async(description: string) => {
        // const newEntry: Entry = {
        //     _id :   uuidv4(),
        //     description,
        //     createAt: Date.now(),
        //     status: 'pending',
        // }

        const { data } = await entriesApi.post<Entry>('/entries',{
            description,
        });

        dispatch({ type: '[Entry] - add entry', payload: data })
    }

    const updateEntry = async({_id, description, status}: Entry) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`,{
                description,
                status,
            });

            dispatch({ type: '[Entry] - Entry-Update', payload: data });
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
        }}>
            { children }
        </EntriesContext.Provider>
    )
};