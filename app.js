const readline = require('readline');
const RentCarsDatasource = require('./src/datasource/rent_cars_datasource');
const CarDatasource = require('./src/datasource/car_datasource');
const CustomerDatasource = require('./src/datasource/customer_datasource');

const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const baseURL = 'http://localhost:3000';
const rentCars = new RentCarsDatasource(baseURL);
const car = new CarDatasource(baseURL);
const customer = new CustomerDatasource(baseURL);


function displayMenu() {
    console.log('WELCOME TO RENTING CARS STORE');
    console.log('SHOW ALL ------------');
    console.log('1. Show all cars');
    console.log('2. Show all customers');
    console.log('3. Show all rents');
    console.log('\nSHOW ONE ------------');
    console.log('4. Show a car');
    console.log('5. Show a rent');
    console.log('6. Show a customer');
    console.log('\nMAIN ------------');
    console.log('7. Show customer rents');
    console.log('8. Rent a car');
    console.log('9. Hand over a car');
}

function input(question) {
    return new Promise((resolve) => {
        scanner.question(question, resolve);
    });
}

function main() {
    displayMenu();

    scanner.question('Choose an option: ', async (choice) => {
        switch (choice) {
            case '1':
                console.log(await car.getAll());
                main();
                break;
            case '2':
                console.log(await customer.getAll());
                main();
                break;
            case '3':
                console.log(await rentCars.getAll());
                main();
                break;
            case '4':
                const carUuid = await input('Car UUID: ');
                if (carUuid) {
                    console.log(await car.getByUuid(carUuid));
                }
                main();
                break;
            case '5':
                const rentUuid = await input('Rent UUID: ');
                if (rentUuid) {
                    console.log(await rentCars.getByUuid(rentUuid));
                }
                main();
                break;
            case '6':
                const customerUuid = await input('Customer UUID: ');
                if (customerUuid) {
                    console.log(await customer.getByUuid(customerUuid));
                }
                main();
                break;
            case '7':
                const uuid = await input('Customer UUID: ');
                if (uuid) {
                    console.log(await rentCars.getAllByCustomer(uuid));
                }
                main();
                break;
            case '8':
                const endDate = await input('End Date (YYYY-MM-DD): ');
                const carRequest = await input('Car UUID: ');
                const customerRequest = await input('Customer UUID: ');
                if (endDate && carRequest && customerRequest) {
                    const request = {
                        endDate: endDate,
                        carUuid: carRequest,
                        customerUuid: customerRequest,
                    };
                    console.log(await rentCars.rent(request));
                }
                main();
                break;
            case '9':
                const handOverUuid = await input('Rent UUID: ');
                if (handOverUuid) {
                    console.log(await rentCars.handOver(handOverUuid));
                }
                main();
                break;

            default:
                console.log('Invalid option');
                scanner.close();
                break;
        }
    });
}

main();