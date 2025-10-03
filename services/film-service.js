const { filters } = require('pug');
const repo = require('../repositories/film-repository');
module.exports = {
    getAll : async function (includeActor = false, pageRequest = {}, filters = {}) {
        const results = await repo.findAll(includeActor, pageRequest, filters);
        return results
    },
    getById : async function (id) {
        const uniqueOne = await repo.findById(id);
        if (!uniqueOne) {
            const err = new Error(`Film not found for ID ${id}`);
            err.code = `NOT FOUND`;
            err.status = 404;
            throw err;
        }
        return uniqueOne
    },
}