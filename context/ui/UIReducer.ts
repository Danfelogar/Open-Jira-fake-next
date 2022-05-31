import { UIState } from "./";

type UIActionType =
| { type: 'UI - Open Sidemenu' }
| { type: 'UI - Close Sidemenu' }
| { type: 'UI - Change Adding Component', payload: boolean }
| { type: 'UI - Start Dragging' }
| { type: 'UI - End Dragging' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'UI - Open Sidemenu':
            return {
                ...state,
                sidemenuOpen: true,
            }

        case 'UI - Close Sidemenu':
            return {
                ...state,
                sidemenuOpen: false,
            }

        case 'UI - Change Adding Component':
            return {
                ...state,
                addingComponent: action.payload,
            }

        case 'UI - Start Dragging':
            return {
                ...state,
                isDragging: true,
            }

        case 'UI - End Dragging':
            return {
                ...state,
                isDragging: false,
            }

        default:
            return state;
    }
}