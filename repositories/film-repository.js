const FilmDetailDto = require("../dtos/film-detail-dto");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
    findAll: async function (
        includeActor = false,
        pageRequest = { page: 1, pageSize: 10 },
        filmFilters = { filmTitle: null, filmRating: [] }
    ) {
        const { page, pageSize } = pageRequest;
        const { filmTitle, filmRating } = filmFilters;

        const titleFilter = filmTitle ? { title: { contains: filmTitle } } : {};
        const ratingFilter =
            filmRating && filmRating.length > 0 ? { rating: { in: filmRating } } : {};

        const filters = { ...titleFilter, ...ratingFilter };

        const totalItems = await prisma.film.count({ where: filters });
        const data = await prisma.film.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: filters,
            orderBy: { title: "desc" },
            include: {
                film_actor: includeActor ? { include: { actor: true } } : false,
            },
        });

        return {
            data,
            page,
            pageSize,
            totalItems,
            totalPage: Math.ceil(totalItems / pageSize),
        };
    },

    findById: async function (fid) {
        return await prisma.film.findUnique({
            where: { id: fid },
            include: {
                film_actor: { include: { actor: true } },
                film_category: { include: { category: true } },
            },
        });
    },

    update: async function (fid, data) {
        const { actors, ...film } = data;
        return await prisma.film.update({
            where: { id: fid },
            data: film,
        });
    },

    create: async function (data) {
        return await prisma.film.create({
            data: data,
        });
    },

    findByTitle: async function (title) {
        return await prisma.film.findFirst({
            where: { title: title },
        });
    },
};
