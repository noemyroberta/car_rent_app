const axios = require('axios');

class RentCarsDatasource {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAll() {
        try {
            const response = await axios.get(`${this.baseURL}/rental/`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching rents: ${error.message}`);
        }
    }

    async getAllByCustomer(customerUuid) {
        try {
            const param = `customerUuid?value=${customerUuid}`;
            const response = await axios.get(`${this.baseURL}/rental/${param}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching rents by customer: ${error.message}`);
        }
    }

    async rent(request) {
        try {
            const response = await axios.post(`${this.baseURL}/rental/`, request);
            return response.data;
        } catch (error) {
            throw new Error(`Error trying to rent car: ${error.message}`);
        }
    }

    async handOver(uuid) {
        try {
            const response = await axios.put(`${this.baseURL}/rental/${uuid}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error trying to hand over car: ${error.message}`);
        }
    }


    async getByUuid(uuid) {
        try {
            const param = `uuid?value=${uuid}`;
            const response = await axios.get(`${this.baseURL}/rental/${param}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching rent with uuid ${uuid}: ${error.message}`);
        }
    }

}

module.exports = RentCarsDatasource;
