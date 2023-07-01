const People = require('../models/people.model');
const bcrypt = require('bcrypt');

const getAllPeople = async () => {
    try {
        const people = await People.findAll();
        return people;
    } catch (error) {
        console.error(error);
        throw new Error('Error when searching for people');
    }
};

const createPerson = async (personData) => {
    const { cpf, name, email, password } = personData;
    try {
        // ----Criptografa a senha----
        const hashedPassword = await bcrypt.hash(password, 10);

        const person = await People.create({ cpf, name, email, password: hashedPassword });

        return person;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar uma nova pessoa');
    }
};

const login = async (inputCpf, password) => {
    try {
        const user = await People.findOne({ where: { cpf: inputCpf } });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // descriptografa
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Senha inválida');
        }

        const { cpf, name, email } = user;
        return { cpf, name, email };
    } catch (error) {
        console.error(error);
        throw new Error('Falha na autenticação');
    }
};


const updatePerson = async (cpf, personData) => {
    const { name, email, password } = personData;
    try {
        const person = await People.findOne({ where: { cpf } });
        if (!person) {
            throw new Error('Pessoa não encontrada');
        }

        person.name = name;
        person.email = email;

        if (password) {
            // Criptografar a nova senha antes de atualizá-la
            const encryptedPassword = await bcrypt.hash(password, 10);
            person.password = encryptedPassword;
        }

        await person.save();
        return person;

    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar a pessoa');
    }
};

const deletePerson = async (cpf) => {
    try {
        const person = await People.findByPk(cpf);
        await person.destroy();
        return 'Pessoa excluída com sucesso';
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao excluir a pessoa');
    }
};

module.exports = { 
    getAllPeople, 
    createPerson, 
    login, 
    updatePerson, 
    deletePerson,
};
