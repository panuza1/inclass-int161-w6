// Import the repository to interact with the database
const customerRepository = require('../repositories/customer-repository');

/**
 * The service layer contains the business logic of the application.
 * It uses the repository to access and manipulate data and then processes it.
 */
module.exports = {
    /**
     * Handles the business logic for creating a customer.
     * @param {object} customerData - Data for the new customer.
     * @returns {Promise<object>} The created customer.
     */
    createCustomer: async function (customerData) {
        // In a real app, you might add validation or data transformation here.
        return await customerRepository.create(customerData);
    },

    /**
     * Handles the business logic for fetching all customers.
     * @param {object} query - Query parameters from the request (includeAddress, page, pageSize).
     * @returns {Promise<object>} The list of customers and page info.
     */
    getAllCustomers: async function (query) {
        const includeAddress = query.includeAddress === 'true';
        const page = parseInt(query.page) || 1;
        const pageSize = parseInt(query.pageSize) || 10;
        return await customerRepository.findAll(includeAddress, { page, pageSize });
    },

    /**
     * Handles the business logic for fetching a single customer by ID.
     * @param {string} customerId - The ID of the customer.
     * @param {object} query - Query parameters (e.g., includeAddress).
     * @returns {Promise<object|null>} The customer or null if not found.
     */
    getCustomerById: async function (customerId, query) {
        const id = parseInt(customerId);
        const includeAddress = query.includeAddress === 'true';
        return await customerRepository.findById(id, includeAddress);
    },

    /**
     * Handles the business logic for updating a customer.
     * @param {string} customerId - The ID of the customer to update.
     * @param {object} customerData - The new data for the customer.
     * @returns {Promise<object>} The updated customer.
     */
    updateCustomerById: async function (customerId, customerData) {
        const id = parseInt(customerId);
        return await customerRepository.updateById(id, customerData);
    },

    /**
     * Handles the business logic for deleting a customer.
     * @param {string} customerId - The ID of the customer to delete.
     * @returns {Promise<object>} The deleted customer data.
     */
    deleteCustomerById: async function (customerId) {
        const id = parseInt(customerId);
        return await customerRepository.deleteById(id);
    },
};
