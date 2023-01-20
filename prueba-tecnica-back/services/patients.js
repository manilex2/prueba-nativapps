const connectToDatabase = require("../helpers/db");

module.exports = {
    getAllPatients,
    createPatient
};

async function getAllPatients() {
    const { Op, Patient } = await connectToDatabase();
    const patients = await Patient.findAll();
    return patients;
}

async function createPatient(data) {
    try {
        const { Patient } = await connectToDatabase();
        const patient = await Patient.create(data);
        return patient;    
    } catch (error) {
        throw error;
    }
}