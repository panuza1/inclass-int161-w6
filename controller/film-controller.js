const service = require('../services/film-service')
const FilmDetailDto = require('../dtos/film-detail-dto');
const SimpleFilmDto = require('../dtos/simple-film-dto');
 module.exports = {
    list: async function (req, res) {
        try {
            const includeActor = req.query.includeActor|| false;
            const {page, pageSize} = req.query;
            const {filmTitle} = req.query;

            const filmRating = req.query.filmRating
            ? Array.isArray(req.query.filmRating)
                ? req.query.filmRating
                : [req.query.filmRating]
            : [];
            filters = {filmTitle, filmRating};
            console.log(filters)

            console.log(`filmTitle = ${filmTitle}`)
            pageRequest = { page: Number(page) || 1, pageSize: Number(pageSize) || 10 };
            const pageFilm = await service.getAll(includeActor, pageRequest, filters);
            const simpleFilms = pageFilm.data.map(film => new SimpleFilmDto(film));
            pageFilm.data = simpleFilms;
            res.json(pageFilm);
        } catch (e) {
            console.log(e, e.status);
            res.status(e.status||500).json({code: e.code, message: e.message, status: e.status});
        }
   },
   get: async function (req, res) {
    const id = Number(req.params.id);
    try {
        const uniqueOne = await service.getById(id);
        res.json(new FilmDetailDto(uniqueOne));
    } catch(e) {
        res.status(e.status || 500).json(
            {code: e.code, message: e.message, status: e.status}
        )
    }
   },
     update: async function (req, res) {
        const data = req.body;
        const id = Number(req.params.id);
        const film = await service.update(id, data);
        res.json(film);
     },
     create: async function (req, res) {
        const data = req.body;
        const film = await service.create(data);
        res.json(film);
     },
     delete: async function (id) {
         // Ensure the film exists first
         await this.getById(id); // will throw 404 if not found

         // Delete the film
         return await service.delete(id); // assumes your repo has a delete method
     }
}
