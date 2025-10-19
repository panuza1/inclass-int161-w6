// Import the service to handle business logic
const customerService = require('../services/customer-service')

/**
 * The controller layer is responsible for handling incoming HTTP requests
 * and sending back HTTP responses. It uses the service layer to perform
 * business operations and communicates in a client-friendly format (JSON).
 */
module.exports = {
    /**
     * Handles the POST /customers request to create a new customer.
     */
    create: async function (req, res) {
        try {
            const customerData = req.body;
            // The service layer might throw an error if validation fails
            const newCustomer = await customerService.createCustomer(customerData);
            res.status(201).json(newCustomer); // 201 Created
        } catch (error) {
            res.status(500).json({ message: 'Error creating customer', error: error.message });
        }
    },

    /**
     * Handles the GET /customers request to fetch all customers.
     */
    getAll: async function (req, res) {
        try {
            const result = await customerService.getAllCustomers(req.query);
            res.status(200).json(result); // 200 OK
        } catch (error) {
            res.status(500).json({ message: 'Error fetching customers', error: error.message });
        }
    },

    /**
     * Handles the GET /customers/:id request to fetch a single customer.
     */
    getById: async function (req, res) {
        try {
            const customer = await customerService.getCustomerById(req.params.id, req.query);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' }); // 404 Not Found
            }
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching customer', error: error.message });
        }
    },

    /**
     * Handles the PUT /customers/:id request to update a customer.
     */
    updateById: async function (req, res) {
        try {
            const updatedCustomer = await customerService.updateCustomerById(req.params.id, req.body);
            if (!updatedCustomer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json(updatedCustomer);
        } catch (error) {
            // Prisma throws a specific error code if the record to update is not found
            if (error.code === 'P2025') {
                 return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(500).json({ message: 'Error updating customer', error: error.message });
        }
    },

    /**
     * Handles the DELETE /customers/:id request to delete a customer.
     */
    deleteById: async function (req, res) {
        try {
            const deletedCustomer = await customerService.deleteCustomerById(req.params.id);
            res.status(200).json({ message: 'Customer successfully deleted', data: deletedCustomer });
        } catch (error) {
            if (error.code === 'P2025') {
                 return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(500).json({ message: 'Error deleting customer', error: error.message });
        }
    },
};
