class SimpleCustomerDto {
    constructor(customer = {}) {
        const { id, firstName, lastName, email, address, active } = customer;
        this.id = id ?? null;
        this.name = [firstName, lastName].filter(Boolean).join(" ") || null;
        this.email = email ?? null;
        this.active = active ?? false;
        if (address) {
            this.address = {
                id: address.id ? address.id : null,
                address: address.address ? `${address.address} ${address.address2}`.trim() : null,
                district: address.district ? address.district : '-'
                ,
                city: address.city && address.city.city ? address.city.city : null,
                postalCode: address.postalCode ? address.postalCode : '-'
                ,
                country: address.city && address.city.country ? address.city.country.country : null,
                phone: address.phone ? address.phone : '-'
                ,
            }
        }
    }
}
module.exports = SimpleCustomerDto 