const axios = require('axios');

class CarDatasource {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAll() {
        try {
            const response = await axios.get(`${this.baseURL}/car/`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching cars: ${error.message}`);
        }
    }

    async insert(request) {
        try {
            const response = await axios.post(`${this.baseURL}/car/`, request);
            return response.data;
        } catch (error) {
            throw new Error(`Error trying to insert car: ${error.message}`);
        }
    }

    
    async getByUuid(uuid) {
        try {
            const response = await axios.get(`${this.baseURL}/car/${uuid}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching car with uuid ${uuid}: ${error.message}`);
        }
    }
}

module.exports = CarDatasource;