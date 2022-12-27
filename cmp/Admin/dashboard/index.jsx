import { Container } from "@mui/material";
import Image from "next/image";
const Dashboard =()=>{
    return(
        <>
        <Container>
            <Image
                src="/admin.jpg"
                width={1000}
                height={510}
                alt="admin"
            />
        </Container>       
        </>
    );
}
export default Dashboard;