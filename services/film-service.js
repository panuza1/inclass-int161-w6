const { filters } = require('pug');
const repo = require('../repositories/film-repository');
const errResp = require('../error/error-response')

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
    update: async function (id, data) {
        await this.getById(id);
        const sameTitleFilm = await repo.findByTitle(data.title);
        if (sameTitleFilm && sameTitleFilm.id !== id) {
            throw errResp.duplicateItem(data.title, 'Film');
        }
        return await repo.update(id, data);
    },
    create: async function (data) {
        const sameTitleFilm = await repo.findByTitle(data.title);
        if (sameTitleFilm) {
            throw errResp.duplicateItem(data.title, 'Film');
        }
        return await repo.create(data);
    },


}