import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from "react-router-dom";

const Success = () => {
    const location = useLocation();
    const [data, setData] = useState({});

    useEffect(() => {
        toast.success("Patient created.");
        setData(location.state);
    }, [location.state]);
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Patient created successfully.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ID: {data.id} <br/>
                        Identification Number: {data.idNumber} <br/>
                        Firstname: {data.firstname} <br/>
                        Lastname: {data.lastname} <br/>
                        Email: {data.email} <br/>
                        Phone Number: {data.phone}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/">
                        <Button size="small">See all</Button>
                    </Link>
                </CardActions>
            </Card>
            <ToastContainer />
        </>
    );
};

export default Success;