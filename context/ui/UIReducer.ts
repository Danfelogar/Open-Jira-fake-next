import { UIState } from "./";

type UIActionType =
| { type: 'UI - Open Sidemenu' }
| { type: 'UI - Close Sidemenu' }

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

        default:
            return state;
    }
}