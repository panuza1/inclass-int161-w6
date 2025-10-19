const {PrismaClient} = require('../generated/prisma');
const prisma = new PrismaClient()

async function getAllFilms() {
    const films = await prisma.film.findMany();
    console.log(films)
}


async function getAllresult() {
    const result = await prisma.customer.findMany()
    console.log(result)
}

getAllresult() 