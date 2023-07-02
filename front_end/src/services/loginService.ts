import axios from "axios";

export const login = async (cpf: string, password: string) => {
    try {
        const response = await axios.post("https://localhost:3001/people/login", {
            cpf,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error("Error logging in");
    }
};

