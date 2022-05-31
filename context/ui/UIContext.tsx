import { createContext } from 'react';

export interface ContextProps {
    sidemenuOpen: boolean;
    addingComponent: boolean;
    isDragging: boolean;

    //Method
    openSideMenu: () => void;
    closeSideMenu: () => void;
    changeAddingComponent: () => void;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);