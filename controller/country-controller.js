var service = require('../services/country-service');
const {response} = require("express");

module.exports = {
    list: async function (req, res) {
            const countries = await service.getAll({});
            res.json(countries);
    },
    get: async function (req, res) {
        const id = Number(req.params.id);
            const {includeCity} = req.query;
            const country = await service.getById(id,includeCity);
            res.json(country);
    },
    update: async function(req, res) {
        const data = req.body
        const id = Number(req.params.id)
        const country = await service.update(id, data)
        res.json(country)
    }  
} 

