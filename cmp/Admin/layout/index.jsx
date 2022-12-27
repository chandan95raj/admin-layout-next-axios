import { useState } from 'react';
import Drawer from '@mui/material/drawer';
import List from '@mui/material/list';
import ListItem from '@mui/material/listitem';
import ListItemButton from '@mui/material/listitembutton';
import ListItemIcon from '@mui/material/listitemicon';
import ListItemText from '@mui/material/listitemtext';
import Stack from '@mui/material/stack';
import AppBar from '@mui/material/appbar';
import Menu from '@mui/icons-material/Menu';
import Button from '@mui/material/button';
import IconButton from '@mui/material/iconbutton';
import Toolbar from '@mui/material/toolbar';
import Link from 'next/link';
import menus from "../../../json-api/admin-menu.json";
const Layout = ({children})=>{
    const[active,setActive]=useState(true);
    const[width,setWidth]=useState(250);
    const controlDrawer =()=>{
        return(
            setActive(!active),
            active ? setWidth(0) : setWidth(250)
        )
    }
    return(
        <>
        <Stack>
            <Drawer sx={{
                width:width,
                "& .MuiDrawer-paper":{
                    width:width,
                    bgcolor:'#f5f5f5'
                }
            }} variant="persistent" open={active}>
                <List>
                    {
                        menus.map((item,index)=>(
                            <Link href={item.path} key={index}>
                                <ListItem disablePadding >                                
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <span className='material-icons'>{item.icon}</span>
                                            </ListItemIcon>
                                            <ListItemText primary={item.label} />
                                        </ListItemButton>                                
                                </ListItem>   
                            </Link>                         
                        ))
                    }                     
                </List>         
            </Drawer>     
            <AppBar sx={{
                width: `calc(100% - ${width}px)`,
                transition:'0.3s',
                bgcolor:'#f5f5f5'
            }}>
                <Stack direction='row' justifyContent='space-between'>
                    <Toolbar>
                        <IconButton  onClick={controlDrawer}>
                            <Menu />
                        </IconButton> 
                    </Toolbar>
                    <Toolbar>
                        <Link href='/'>
                            <Button variant="contained" color="error">Logout</Button>
                        </Link>                        
                    </Toolbar>
                </Stack>             
            </AppBar>
            <Stack sx={{
                ml:`${width}px`,
                mt:8,
                p:3,
                transition:'0.3s'
            }}>
                {children}
            </Stack>
        </Stack>   
        </>
    );
}
export default Layout;