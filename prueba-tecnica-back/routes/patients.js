const express = require('express');
const router = express.Router();
const { getAllPatients, createPatient } = require("../services/patients");

router.get("/", async (req, res) => {
    const pacientes = await getAllPatients();
    res.status(200).send(pacientes);
});

router.post("/create", async (req, res) => {
    try {
        const data = req.body.data;
        const paciente = await createPatient(data);
        res.status(200).json(paciente);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(500).json({
                errorTitle: "Patient already exists",
                errorMessage: "Patient with this Identification Number already exists"
            })
        } else if (error.name === 'SequelizeValidationError') {
            const err = error.errors[0].message;
            switch (err) {
                case "Validation isNumeric on idNumber failed":
                    res.status(500).json({
                        errorTitle: "Identification Number",
                        errorMessage: "Identification Number must be numeric"
                    }); 
                    break;
                case "Validation isEmail on email failed":
                    res.status(500).json({
                        errorTitle: "Email",
                        errorMessage: "Email must be a valid email format"
                    }); 
                    break;
                case "Validation isNumeric on phone failed":
                    res.status(500).json({
                        errorTitle: "Phone",
                        errorMessage: "Phone Number must be numeric"
                    }); 
                    break;
                case "Paciente.firstname cannot be null":
                    res.status(500).json({
                        errorTitle: "NOT NULL",
                        errorMessage: "Firstname cannot be null"
                    }); 
                    break;
                case "Paciente.lastname cannot be null":
                    res.status(500).json({
                        errorTitle: "NOT NULL",
                        errorMessage: "Lastname cannot be null"
                    }); 
                    break;
                case "Paciente.idNumber cannot be null":
                    res.status(500).json({
                        errorTitle: "NOT NULL",
                        errorMessage: "Identification Number cannot be null"
                    }); 
                    break;
                case "Paciente.email cannot be null":
                    res.status(500).json({
                        errorTitle: "NOT NULL",
                        errorMessage: "Email cannot be null"
                    }); 
                    break;
                case "Paciente.phone cannot be null":
                    res.status(500).json({
                        errorTitle: "NOT NULL",
                        errorMessage: "Phone cannot be null"
                    }); 
                    break;
            
                default:
                    break;
            }
        } else if (error.name === 'SequelizeConnectionRefusedError') {
            res.status(500).json({
                errorTitle: "Connection",
                errorMessage: "Connection to the database is failed"
            })
        } else if (error.name === 'SequelizeDatabaseError') {
            res.status(500).json({
                errorTitle: "Length Error",
                errorMessage: "Some of the fields exceed the character limit"
            })
        } else {
            res.status(500).json({
                errorTitle: "Unknown Error",
                errorMessage: "Unknown Error please contact with the system administrator"
            });
        }
    }
});

module.exports = router;