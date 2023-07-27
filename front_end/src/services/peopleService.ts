/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export async function getAllPeople() {
    try {
        const response = await axios.get('https://localhost:3001/people');
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching people.');
    }
}

export async function getPersonByCpf(cpf:string) {
    try {
        const response = await axios.get(`https://localhost:3001/people/${cpf}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching people.');
    }
}


export async function createPerson(newData: any) {
    try {
        const response = await axios.post('https://localhost:3001/people/', newData);
        return response.data;
    } catch (error) {
        console.error(error);
        errorType(error);
    }
}

export async function deletePerson(cpf: string) {
    try {
        const response = await axios.delete(`https://localhost:3001/people/${cpf}`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        errorType(error);
    }
}

export async function updatePerson(id: number, updatedPerson: any) {
    try {
        const response = await axios.put(`https://localhost:3001/people/${id}`, updatedPerson);
        return response.data;
    } catch (error) {
        console.error(error);
        errorType(error);
    }
}

export function errorType(error: any) {
    if (error.response.status === 400) {
        throw new Error("Bad request error");
    } else if (error.response.status === 500) {
        throw new Error("Internal server error");
    } else if (error.response.status === 404) {
        throw new Error("Person not found");
    } else {
        throw new Error("Unknown error");
    }
}
