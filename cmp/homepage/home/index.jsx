import {useEffect, useState} from 'react';
import Grid from "@mui/material/grid";
import Container from "@mui/material/container";
import Card from "@mui/material/card";
import Button from "@mui/material/button";
import Typography from "@mui/material/typography";
import Stack from "@mui/material/stack";
import Image from "next/image";
import Box from '@mui/material/box';
import axios from 'axios';

const Home = ()=>{
    const [products,setProducts] = useState(null);
    const [value,setValue] = useState(4);
    useEffect(()=>{
        const req = async ()=>{
            try{
                const {data} = await axios({
                    method:'get',
                    url:`https://fakestoreapi.com/products?limit=${value}`
                })
                console.log(data);
                setProducts(data);
            }
            catch(err)
            {
                console.log(err.response.data);
            }
        }
        req();
    },[value])

    return( 
        <>
        <Container sx={{py:2}}>
            <Grid container spacing={10}>
                {
                    products && products.map((item,index)=>(
                        <Grid item md={3} key={index}>
                            <Card sx={{width:'210px'}}>      
                                <Image
                                    width={210}
                                    height={280}
                                    src={item.image}
                                    alt="women"
                                />
                                <Stack sx={{p:1}} spacing={1}>
                                    <Stack direction='row' justifyContent="space-between" alignItems='center'>
                                        <Typography variant="h6" sx={{fontSize:"14px"}}>
                                            {item.title}
                                        </Typography>
                                    </Stack>
                                    
                                    <Typography variant='body' color="text.secondary" sx={{fontSize:'14px'}} >
                                        {item.description.slice(0,50)}
                                    </Typography>
                                    <Stack direction='row' spacing={1}>
                                        <Typography variant='h6' sx={{fontSize:'13px'}}>
                                            <Stack direction='row'>Rs. {item.price}</Stack>  
                                        </Typography>
                                                                      
                                    </Stack>
                                    <Typography  variant='h6' sx={{fontSize:'13px'}} color="error" >
                                        Only Few Left!
                                    </Typography>
                                    
                                </Stack>                        
                            </Card>
                        </Grid>
                    ))                    
                }
                <Box sx={{m:'auto',py:3}}>
                    <Button onClick={()=>setValue(value+4)}  variant="contained" color="secondary" sx={{px:3}}>Load More</Button> 
                </Box>       
            </Grid>
        </Container>
        </>
    ); 
}
export default Home;