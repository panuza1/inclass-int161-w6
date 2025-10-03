const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
module.exports = {
    findAll: async function () {
        return await prisma.country.findMany();
    },
    findById: async function (id, includeCity = false) {
        return await prisma.country.findUnique({
            where: {id: id},
            include: includeCity ? {
                cities: {
                    select: {
                        id: true,
                        city: true,
                    }
                }
            } : false,
        });
    },
    update: async function (id, data) {
        return await prisma.country.update({
            where: {id: id},
            data: data,
        });
    },
    findByCountryName: async function(countryNum) {
        return await prisma.country.findFirst({
            where: {country: countryNum},
        });
    },
}
