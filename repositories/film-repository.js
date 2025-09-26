const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
module.exports = {
    findAll: async function (includeActor = false, pageRequet = {page: 1, pageSize: 10},
                             filmFiters = {filmTitle: null, filmRating : []}) {
        const {page, pageSize} = pageRequet;
        const {filmTitle, filmRating} = filmFiters;
        const titleFiter = filmTitle ? {title: {contains: filmTitle}} : {}
        const ratingFilter = Object.keys(filmRating).length>0 ? {rating: {in: filmRating}}:null ;
        // const {sortBy} = filmFiters
        const filters = {...titleFiter?titleFiter: {} , ...(ratingFilter ? ratingFilter : {})};
        console.log(filters);
        console.log('sort by:', sortBy)
        const totalItems = await prisma.film.count({where: filters});
        const data = await prisma.film.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                film_actor: includeActor ? {include: {actor: true}} : false,
            },
            where: filters,
            orderBy: {title: 'desc'}
        });
    },
    findById: async function (fid) {
        return await prisma.film.findUnique({
            where: {id: fid},
            include: {
                film_actor: {include: {actor: true}},
                film_category: {include: {category: true}},
            },
        })
    }
}