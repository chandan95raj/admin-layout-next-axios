import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "next/link";
import menus from "../../json-api/Menu";
const Navbar =()=>{
    const MenuDesign=(data)=>{
        return(
            <>
            <Link href={data.allData.path}>
                <Button color="inherit" sx={{mx:1}}>{data.allData.label}</Button>
            </Link>
            </>
        );
    }
    return(
        <>
        <Stack>
            <AppBar sx={{bgcolor:'white',color:'black'}} position="static">
                <Stack direction='row' justifyContent='space-between'>
                    <Toolbar>
                        <Button color="inherit">Myntra</Button>
                    </Toolbar>
                    <Toolbar>
                        {
                            menus.map((item,index)=>{
                                return <MenuDesign allData={item} key={index} /> ;
                            })
                        }
                        <Link href='/admin-panel'>
                            <Button variant="contained" color="primary" sx={{mx:1}}>Admin</Button>
                        </Link>
                    </Toolbar>
                </Stack>             
            </AppBar>
        </Stack>
        </>
    );
}
export default Navbar;