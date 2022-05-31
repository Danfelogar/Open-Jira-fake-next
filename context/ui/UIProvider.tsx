import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

    export interface UIState {
        sidemenuOpen: boolean;
        addingComponent: boolean;
        isDragging: boolean;
    }

    interface Props {
        children: ReactNode;
    }

    const UI_INITIAL_STATE: UIState = {
        sidemenuOpen: false,
        addingComponent: false,
        isDragging: false,
    }

    export const UIProvider:FC<Props>= ({ children }) => {

        const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE );

        const openSideMenu =() => dispatch({ type: 'UI - Open Sidemenu' });
        const closeSideMenu =() => dispatch({ type: 'UI - Close Sidemenu' });
        const changeAddingComponent =() => dispatch({ type: 'UI - Change Adding Component', payload: !state.addingComponent });
        const startDragging = () => dispatch({ type: 'UI - Start Dragging' });
        const endDragging = () => dispatch({ type: 'UI - End Dragging' });

        return(
            <UIContext.Provider value={{
                ...state,

                openSideMenu,
                closeSideMenu,
                changeAddingComponent,
                startDragging,
                endDragging,
            }}>
                { children }
            </UIContext.Provider>
        )
    };