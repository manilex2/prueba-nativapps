import React, { useState } from "react";
import { Box, TextField, Card, CardHeader, CardContent, Button } from '@mui/material';
import { Send } from "@mui/icons-material";
import { create } from "../services/patient";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const CrearFormulario = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        idNumber: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "phone" && value.length > 20) {
            return;
        }
        if ((name === "idNumber" && value.length > 20) || (name === "idNumber" && value < 0)) {
            return;
        }
        setValues({ ...values, [name]: value });
    }
    
    const { idNumber, firstname, lastname, email, phone } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (idNumber.length === 0 || firstname.length === 0 || lastname.length === 0 || email.length === 0 || phone.length === 0) {
            toast.error("All fields are required");
            return;
        }
        toast.promise(
            create(values),
            {
                pending: {
                    render(){
                        return "Creating Patient..."
                    },
                    icon: false,
                },
                error: {
                    render({data}){
                        return data.response.data.errorMessage
                    }
                }
            }
        ).then(({data}) => {
            navigate('/success', {
                state: data
            })
        })
    }

    return ( 
        <>
            <Card
                variant="outlined"
                className="form-card-container"
                sx={{
                    minWidth: 275,
                    width: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CardHeader
                    title="Register Patient Form"
                />
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { marginTop: 2 }
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <TextField
                                id="outlined-required"
                                label="Identification Document"
                                required
                                type="number"
                                fullWidth
                                value={idNumber}
                                onChange={handleChange}
                                name="idNumber"
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-required"
                                label="Firstname"
                                required
                                className="form-half-input"
                                value={firstname}
                                onChange={handleChange}
                                name="firstname"
                            />
                            <TextField
                                id="outlined-required"
                                label="Lastname"
                                required
                                className="form-half-input"
                                value={lastname}
                                onChange={handleChange}
                                name="lastname"
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-required"
                                label="Email"
                                required
                                type="email"
                                className="form-half-input"
                                value={email}
                                onChange={handleChange}
                                name="email"
                            />
                            <TextField
                                id="outlined-required"
                                label="Phone"
                                required
                                type="tel"
                                className="form-half-input"
                                value={phone}
                                onChange={handleChange}
                                name="phone"
                            />
                        </div>
                        <div 
                            style={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Button
                                variant="contained"
                                endIcon={<Send />}
                                sx={{
                                    marginTop: 2
                                }}
                                type="submit"
                            >
                                Register Patient
                            </Button>
                        </div>
                    </Box>
                </CardContent>
            </Card>
            <ToastContainer />
        </>
    );
};

export default CrearFormulario;