const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User = require('../models/User')

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};

router.post('/register', async (req, res) => {
    const { email } = req.body;
    const { cpf } = req.body;

    try {

        if (await User.findOne({ email })) 
            return res.status(400).send({error: 'Email já cadastrado anteriormente'});
        if (await User.findOne({ cpf })) 
            return res.status(400).send({error: 'CPF já cadastrado anteriormente'});

        const user = await User.create(req.body);

        user.password = undefined;   

        return res.send({ user, token: generateToken({ id: user.id }) });

    } catch (err) {
        return res.status(400).send({ error:'Falha de registro' });
    }

});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

        //Verificação de usuário
    if (!user)
        return res.status(400).send({ error: "Usuário não encontrado" });

        //Verificação de senha
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: "Senha incorreta" }); 

    user.password = undefined;   

    //se logar retorna o usuario
    res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = app => app.use('/auth', router);