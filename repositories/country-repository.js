const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
module.exports = {
    findAll: async function () {
        return await prisma.country.findMany();
    },
    findById: async function (id, includeCity = false) {
        return await prisma.country.findUnique({
            where: { id: id },
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
}