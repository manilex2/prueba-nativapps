import * as React from "react";
import { Routes, Route } from "react-router-dom";
import CrearFormulario from '../components/crearFormulario';
import FormTable from '../components/formTable';
import Success from "../components/success";

const Root = () => {
    return (
        <Routes>
            <Route path="/" element={<FormTable />}/>
            <Route path="create" element={<CrearFormulario />} />
            <Route path="success" element={<Success />} />
        </Routes>
    )
}

export default Root;