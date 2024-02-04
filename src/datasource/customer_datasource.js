const axios = require('axios');

class CustomerDatasource {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAll() {
        try {
            const response = await axios.get(`${this.baseURL}/customer/`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    }

    async insert(request) {
        try {
            const response = await axios.post(`${this.baseURL}/customer/`, request);
            return response.data;
        } catch (error) {
            throw new Error(`Error trying to insert customer: ${error.message}`);
        }
    }

    
    async getByUuid(uuid) {
        try {
            const response = await axios.get(`${this.baseURL}/customer/${uuid}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customer with uuid ${uuid}: ${error.message}`);
        }
    }
}

module.exports = CustomerDatasource;