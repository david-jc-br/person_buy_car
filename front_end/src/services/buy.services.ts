import axios from "axios";

export async function getBuysByCpf(cpf:string) {
    try {
        const response = await axios.get(`https://localhost:3001/buy/cpf/${cpf}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching cars.');
    }
}

export async function createBuy(buyData: any) {
    try {
        const response = await axios.post(`https://localhost:3001/buy/`, buyData);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching cars.');
    }
}