const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();

/**
 * The repository layer is responsible for all direct communication with the database.
 * It uses the Prisma client to perform CRUD (Create, Read, Update, Delete) operations.
 */
module.exports = {
    /**
     * Creates a new customer in the database.
     * @param {object} customerData - The data for the new customer.
     * @returns {Promise<object>} The newly created customer object.
     */
    create: async function (customerData) {
        // The 'data' property is where you pass the object to be created.
        return await prisma.customer.create({
            data: customerData,
        });
    },

    /**
     * Retrieves all customers with pagination.
     * @param {boolean} includeAddress - Flag to include related address data.
     * @param {object} pagination - Object with page and pageSize.
     * @returns {Promise<object>} An object containing the list of customers and pagination info.
     */
    findAll: async function (includeAddress = false, { page = 1, pageSize = 10 }) {
        const totalItems = await prisma.customer.count();
        const data = await prisma.customer.findMany({
            skip: (page - 1) * pageSize,
            take: Number(pageSize),
            include: {
                address: includeAddress ? {
                    include: {
                        city: {
                            include: { country: true }
                        },
                    }
                } : false,
            },
        });
        return {
            data: data,
            pageInfo: {
                page: Number(page),
                pageSize: Number(pageSize),
                totalItems: totalItems,
                totalPage: Math.ceil(totalItems / pageSize),
            }
        }
    },

    /**
     * Retrieves a single customer by their unique ID.
     * @param {number} cid - The ID of the customer.
     * @param {boolean} includeAddress - Flag to include related address data.
     * @returns {Promise<object|null>} The customer object or null if not found.
     */
    findById: async function (cid, includeAddress = false) {
        return await prisma.customer.findUnique({
            where: { id: cid },
            include: {
                address: includeAddress ? {
                    include: {
                        city: {
                            include: { country: true }
                        },
                    }
                } : false,
            },
        });
    },

    /**
     * Updates an existing customer's data by their ID.
     * @param {number} cid - The ID of the customer to update.
     * @param {object} customerData - An object containing the fields to update.
     * @returns {Promise<object>} The updated customer object.
     */
    updateById: async function (cid, customerData) {
        return await prisma.customer.update({
            where: { id: cid },
            data: customerData,
        });
    },

    /**
     * Deletes a customer from the database by their ID.
     * @param {number} cid - The ID of the customer to delete.
     * @returns {Promise<object>} The customer object that was deleted.
     */
    deleteById: async function (cid) {
        return await prisma.customer.delete({
            where: { id: cid },
        });
    }
};
