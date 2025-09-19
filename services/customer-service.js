const repo = require('../repositories/customer-repository')

module.exports = {
    getAll: async function (includeAddress =false, pageRequest = {}) {
        const array = await repo.findAll(includeAddress, pageRequest);
        return array;
    },
    getById: async function (id) {
        const uniqueOne = await repo.findById(id);
        if (!uniqueOne) {
            const err = new Error(`City not found for ID ${id} `);
            err.code = 404;
            err.status = 404;
            throw err;
        }
        return uniqueOne;
    }
}