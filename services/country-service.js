const repo = require('../repositories/country-repository');
const errResp = require('../error/error-response');

module.exports = {
    getAll: async function () {
        return await repo.findAll();
    },
    getById: async function (id, includeCity = false) {
        const uniqueOne = await repo.findById(id, includeCity);
        if (!uniqueOne) throw errResp.notFoundError(id, 'Country');
        return uniqueOne ;
    },
    update: async function (id, data) {
        await this.getById(id);
        const sameNamaCountry = await repo.findByCountryName(data.country);
        if (sameNamaCountry && sameNamaCountry.id !== id) {
            throw errResp.duplicateItem(data.country, 'Country')
        }
        return await repo.update(id, data);
    }
}
