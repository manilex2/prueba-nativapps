import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { getAll } from "../services/patient";
import { Link } from "react-router-dom";

const FormTable = () => {

    const [ rows, setRows ] = useState([]);

    useEffect(() => {
        const data = async () => {
            const dat = (await getAll()).data;
            setRows(dat);
        }
        data();
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Identification Number</TableCell>
                            <TableCell align="right">Firstname</TableCell>
                            <TableCell align="right">Lastname</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.idNumber}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.idNumber}
                                </TableCell>
                                <TableCell align="right">{row.firstname}</TableCell>
                                <TableCell align="right">{row.lastname}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to="/create">
                <Fab color="primary" aria-label="add">
                    <Add/>
                </Fab>
            </Link>
        </>
        
    )
};

export default FormTable;