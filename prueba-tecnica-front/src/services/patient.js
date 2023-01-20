import axios from 'axios';

const create = async (data) => {
    return await axios.post(`http://localhost:4200/patients/create`, {
        data
    })
}

const getAll = async() => {
    return await axios.get(`http://localhost:4200/patients`)
}

export { create, getAll };