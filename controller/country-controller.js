var service = require('../services/country-service');

module.exports = {
    list: async function (req, res) {
        try {
            const countries = await service.getAll({});
            res.json(countries);
        } catch (e) {
            res.status(500).json(
                {
                    code: e.code, message: e.message,
                    status: e.status
                }
            );
        }
    },
    get: async function (req, res) {
        const id = Number(req.params.id);
        try {
            const {includeCity} = req.query;
            const country = await service.getById(id,includeCity);
            res.json(country);
        } catch (e) {
            res.status(e.status).json(
                {code:e.code, mesage:e.message, status:e.status}
            );
        }
    }
}

