const service = require('../services/customer-service')
const SimpleCustomerDto = require('../dtos/simple-customer-dto')

module.exports = {
    list: async function (req, res) {
        try {
            const includeAddress = req.query.includeAddress || false;
            const {page, pageSize} = req.query;
            pageRequest = {
                page: Number(page) || 1,
                pageSize: Number(pageSize) || 10,
            };
            const pageCustomer = await service.getAll(includeAddress, pageRequest);
            simpleCustomers = pageCustomer.data.map(customer => new SimpleCustomerDto(customer));
            pageCustomer.data = simpleCustomers;
            res.json(pageCustomer);
        } catch (error) {
            res.status(error.status).json({code:error.code, message:error.message, statusCode:error.statusCode});
        }
    },
    get: async function (req, res) {
        const id = req.params.id;
        try {
            const uniqueOne = await service.getById(id);
            res.json(new SimpleCustomerDto(uniqueOne));
        } catch (error) {
            res.status(error.status).json(
                {code: error.code, message:error.message, statusCode:error.statusCode}
            )
        }
    }
}