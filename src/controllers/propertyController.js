const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Property = require('../models/property');


const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();

        return res.send({ properties });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao listar imóveis" })
    }
});

router.get('/:propertyId', async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);

        return res.send({ property });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao listar imóvel" })
    }
});

router.post('/', async (req, res) => {
    try {
        const property = await Property.create(req.body);

        return res.send({ property });

    } catch (err) {
        return res.status(400).send({ error: "Erro ao criar novo imóvel" })
    }
});

router.put('/:propertyId', async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.propertyId, req.body);

        return res.send({ property });

    } catch (err) {
        return res.status(400).send({ error: "Erro ao editar imóvel" })
    }
});

router.delete('/:propertyId', async (req, res) => {
    try {
        await Property.findByIdAndRemove(req.params.propertyId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: "Erro ao deletar imóvel" })
    }
});

module.exports = app => app.use('/properties', router);