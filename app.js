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
    console.log('\n\nSHOW ONE ------------');
    console.log('4. Show a car');
    console.log('5. Show a rent');
    console.log('6. Show a customer');
    console.log('\n\nMAIN ------------');
    console.log('7. Show customer rents');
    console.log('8. Rent a car');
    console.log('9. Hand over a car');
}

function main() {
    displayMenu();
    scanner.question('Choose an option: ', async (choice) => {
        switch (choice) {
            case '1':
                console.log(await car.getAll());
                break;
            case '2':
                console.log(await customer.getAll()['customers']);
                break;
            case '3':
                console.log(await rentCars.getAll()['rents']);
                break;
        }
    });

}

main();