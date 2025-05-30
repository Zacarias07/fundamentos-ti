const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota de cadastro
router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        const newUser = new User({ nome, email, senha });
        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor.' });
    }
});

// Rota para listar usuários (exemplo)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor.' });
    }
});

// Rota para atualizar usuário pelo ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Atualiza os campos que forem enviados
        if (nome) user.nome = nome;
        if (email) user.email = email;
        if (senha) user.senha = senha;

        await user.save();

        res.json({ message: 'Usuário atualizado com sucesso.', user });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
});

// Rota para deletar usuário pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
});

module.exports = router;
