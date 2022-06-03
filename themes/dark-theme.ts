import { createTheme } from "@mui/material";
import { grey, pink, red } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#19857b',
        },
        error: {
            main: pink.A400,
        },

    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#4a148c',
                },
            },
        },
    },
});