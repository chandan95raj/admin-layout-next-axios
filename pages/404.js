import dynamic from 'next/dynamic';
import { Stack, Typography } from "@mui/material";

const MediaQuery = dynamic(() => import('react-responsive'), {
    ssr: false
})

const error =()=>(
    <Stack sx={{height:"100vh",textAlign:'center'}} justifyContent='center' alignItem="center">
        <MediaQuery minWidth={1224}>
            <Typography variant="h1" color="error">
                Page Not Found | 404
            </Typography>
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
            <Typography variant="h6">
                Page Not Found | 404
            </Typography>
        </MediaQuery> 
    </Stack>
);
export default error;