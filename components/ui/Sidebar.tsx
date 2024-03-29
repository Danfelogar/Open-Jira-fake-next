import { useContext } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, menuItemClasses, Typography } from "@mui/material"
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import { UIContext } from "../../context/ui";

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu }  = useContext(UIContext);

    return (
        <Drawer
            anchor="left"
            open={ sidemenuOpen }
            onClose={ closeSideMenu }
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">Menu</Typography>
                </Box>

                <List>
                    {
                        menuItems.map( (text, idx)=>(
                            <ListItem button key={idx}>
                                <ListItemIcon >
                                    { idx % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItem>
                        ))
                    }
                </List>

                <Divider/>

                <List>
                    {
                        menuItems.map( (text, idx)=>(
                            <ListItem button key={idx}>
                                <ListItemIcon >
                                    { idx % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}
