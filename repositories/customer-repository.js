const {PrismaClient} = require('../generated/prisma');
const prisma = new PrismaClient();

module.exports = {
    findAll: async function (includeAddress = false, {page = 1, pageSize = 10}) {
        const totalItems = await prisma.customer.count();
        const data = await prisma.customer.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                address: includeAddress ? {
                    include : {
                        city: {
                            include: {country: true}
                        },
                    }
                }: false,
            },
        });
        return {
            data: data,
            pageInfo: {
                page: page,
                pageSize: pageSize,
                totalItems: totalItems,
                totalPage: Math.ceil(totalItems / pageSize),
            }
        }
    },
    findById: async function (cid) {
        return await prisma.customer.findUnique({
            where: {id: cid},
            include: {
                address: {
                    include: {
                        city: {
                            include: {
                                country: true
                            }
                        },
                    }
                }
            }
        });
    }
}