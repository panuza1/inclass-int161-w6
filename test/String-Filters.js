const {PrismaClient} = require('../generated/prisma');
const {contentDisposition} = require("express/lib/utils");
const prisma = new PrismaClient()

async function getAllFilms(filter) {
    const films = await prisma.film.findMany({
            where: {
                title: {contains: filter}
            },
            orderBy: {title : 'desc'}
        }
    );
    let len = films.length
    console.log(len)
    console.log(films)
}

getAllFilms('dino') 
