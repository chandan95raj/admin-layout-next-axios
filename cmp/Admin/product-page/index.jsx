import {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Image from "next/image";
import axios from 'axios';
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
const ProductPage =()=>{
    const [products,setProducts] = useState(null);
    const [limit,setLimit] = useState(4);
    const[modalState,changeModalState]= useState(false);    
    
    useEffect(()=>{
        const req = async ()=>{
            try{
                const {data} = await axios({
                    method:'get',
                    url:`https://fakestoreapi.com/products?limit=${limit}`
                })
                setProducts(data);
            }
            catch(err)
            {
                console.log(err.response.data);
            }
        }
        req();
    },[])


    const insertData= async (e)=>{
        e.preventDefault();
        const form = e.target;
        const alldata = {};
        for(let input of form)
        {
            alldata[input.name] = (input.name === "image" ? input.files[0].name : input.value); 
        }
        try {
            const {data} = await axios({
                method: 'post',
                data: alldata,
                url: 'https://fakestoreapi.com/products'
            });
            console.log(data)           
        }
        catch(err)
        {
            console.log(err.response.data)
        }
    }

    const editData = (x)=>{
        alert(x.id)   
    }


    const deleteData= async (index)=>{
        try{
            const {data} = await axios({
                method:'delete',
                url:`https://fakestoreapi.com/products/${index}`
            })
            console.log(data);           
        }
        catch(err)
        {
            console.log(err.response.data);
        }
        let tmp = [...products];
        tmp.splice(index,1);
        return setProducts(tmp);
    }

    return(
        <>
        <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">
                    Product / {limit}
            </Typography>
            <Button onClick={()=>changeModalState(!modalState)} variant="contained" color="success">Add New</Button>                
        </Stack>
        <Dialog open={modalState}>
            <Stack direction="row" justifyContent='space-between' alignItems='center'>
                <DialogTitle >
                    Add New                
                </DialogTitle>
                <Box>
                    <IconButton onClick={()=>changeModalState(!modalState)}>
                        <CloseIcon />
                    </IconButton>
                </Box>                
            </Stack> 
                <DialogContent dividers>
                    <form onSubmit={insertData}>
                        <Stack spacing={3}>                        
                            <Box>
                                <TextField name="title" type="text" variant="standard" label="Title"  fullWidth />
                            </Box>                            
                            <Box>
                                <TextField name="price" type="number" variant="standard" label="Price"  fullWidth />
                            </Box>
                            <Box>
                                <TextField type="text" name="description" variant="standard" label="description"  fullWidth />
                            </Box>
                            <Box>
                                <TextField type="file" name="image" variant="standard" label="image"  fullWidth />
                            </Box>
                            <Box>
                                <TextField type="text" name="category" variant="standard" label="category"  fullWidth />
                            </Box>
                            <Box>
                                <Button type="submit" variant="contained" color="success">Add New</Button>
                            </Box>                                    
                        </Stack>
                    </form>        
                </DialogContent>            
        </Dialog>
            <hr />          
            <Stack>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S/No.</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {
                            products && products.map((item,index)=>(
                                <TableRow key={index}>
                                    <TableCell>{index+1}.</TableCell>
                                    <TableCell>
                                        <Image 
                                            src={item.image}
                                            width={50}
                                            height={50}
                                            alt={item.image}
                                            style={{
                                                borderRadius:"50%"
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>&#8377; {item.price}</TableCell>
                                    <TableCell>
                                        <Stack direction='row'>
                                            <IconButton color="info" onClick={()=>editData(item)}>
                                                <span className='material-icons'>edit</span>
                                            </IconButton>
                                            <IconButton onClick={()=>deleteData(index)} color="error">
                                                <span className='material-icons'>delete</span>                                            
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Stack>
        </Stack>   
        </>
    );
}
export default ProductPage;