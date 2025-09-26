const service = require('../services/film-service')
const FilmDetailDto = require('../dtos/film-detail-dto')
const SimpleFilmDto = require('../dtos/simple-film-dto')

module.exports = {
    list: async function (req, res) {
        try {
            const sortBy = req.query.sortBy || null;
            const [key, value] = sortBy.split(":");
            const sortObj = { [key]: value };

            const includeActor = req.query.includeActor|| false;
            const {page, pageSize} = req.query;
            const {filmTitle} = req.query;
            const filmRating = req.query.filmRating
                ? Array.isArray(req.query.filmRating)
                    ? req.query.filmRating
                    : [req.query.filmRating]
                : [];
            filters = {filmTitle, filmRating, sortBy:sortObj};
            console.log(filters);
            pageRequest = {page: Number(page) || 1, pageSize: Number(pageSize) || 10};
            const pageFilm = await service.getAll(includeActor, pageRequest, filters);
        } catch (e) {
            console.log(e, e.status);
            res.status(e.status||500).json({code: e.code, message: e.message, status: e.status});
        }
    },
    get: async function (req, res) {
        const id = Number(req.params.id);
        try {
            const uniqueOne = await service.getById(id);
            res.json(new FilmDetailDto(uniqueOne))
        } catch (e) {
            res.status(e.status || 500).json(
                {code: e.code, message: e.message, status: e.status}
            );
        }
    },
}