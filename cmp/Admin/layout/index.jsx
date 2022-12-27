import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
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