import axios from "axios";
import { errorType } from "./peopleService";

export async function getAllCars() {
    try {
        const response = await axios.get('https://localhost:3001/car');
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching cars.');
    }
}


export async function createCar(newData: any) {
    try {
        const response = await axios.post('https://localhost:3001/car/', newData);
        return response.data;
    } catch (error) {
        console.error(error);
        errorType(error);
    }
}

export async function deleteCar(plate: string) {
    try {
        const response = await axios.delete(`https://localhost:3001/car/${plate}`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        errorType(error);
    }
}

export async function updateCar(plate: string, newdata: any) {
    try {
        const response = await axios.put(`https://localhost:3001/car/${plate}`, newdata);
        return response.data;
    } catch (error: any) {
        console.error(error);
        errorType(error);
    }
}