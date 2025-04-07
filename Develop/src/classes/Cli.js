"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const Truck_js_1 = __importDefault(require("./Truck.js"));
const Car_js_1 = __importDefault(require("./Car.js"));
const Motorbike_js_1 = __importDefault(require("./Motorbike.js"));
const Wheel_js_1 = __importDefault(require("./Wheel.js"));
// define the Cli class
class Cli {
    constructor(vehicles) {
        this.exit = false;
        this.vehicles = vehicles;
    }
    // static method to generate a vin
    static generateVin() {
        return (Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15));
    }
    // method to choose a vehicle from existing vehicles
    chooseVehicle() {
        inquirer_1.default
            .prompt([
            {
                type: 'list',
                name: 'selectedVehicleVin',
                message: 'Select a vehicle to perform an action on',
                choices: this.vehicles.map((vehicle) => {
                    return {
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle.vin,
                    };
                }),
            },
        ])
            .then((answers) => {
            this.selectedVehicleVin = answers.selectedVehicleVin;
            this.performActions();
        });
    }
    // method to create a vehicle
    createVehicle() {
        inquirer_1.default
            .prompt([
            {
                type: 'list',
                name: 'vehicleType',
                message: 'Select a vehicle type',
                choices: ['Car', 'Truck', 'Motorbike'], // Include all vehicle types here
            },
        ])
            .then((answers) => {
            if (answers.vehicleType === 'Car') {
                this.createCar();
            }
            else if (answers.vehicleType === 'Truck') {
                this.createTruck();
            }
            else if (answers.vehicleType === 'Motorbike') {
                this.createMotorbike();
            }
        });
    }
    // method to create a car
    createCar() {
        inquirer_1.default
            .prompt([
            { type: 'input', name: 'color', message: 'Enter Color' },
            { type: 'input', name: 'make', message: 'Enter Make' },
            { type: 'input', name: 'model', message: 'Enter Model' },
            { type: 'input', name: 'year', message: 'Enter Year' },
            { type: 'input', name: 'weight', message: 'Enter Weight' },
            { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        ])
            .then((answers) => {
            const car = new Car_js_1.default(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), []);
            this.vehicles.push(car);
            this.selectedVehicleVin = car.vin;
            this.performActions();
        });
    }
    // method to create a truck
    createTruck() {
        inquirer_1.default
            .prompt([
            { type: 'input', name: 'color', message: 'Enter Color' },
            { type: 'input', name: 'make', message: 'Enter Make' },
            { type: 'input', name: 'model', message: 'Enter Model' },
            { type: 'input', name: 'year', message: 'Enter Year' },
            { type: 'input', name: 'weight', message: 'Enter Weight' },
            { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
            { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
        ])
            .then((answers) => {
            const truck = new Truck_js_1.default(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), [], parseInt(answers.towingCapacity));
            this.vehicles.push(truck);
            this.selectedVehicleVin = truck.vin;
            this.performActions();
        });
    }
    // method to create a motorbike
    createMotorbike() {
        inquirer_1.default
            .prompt([
            { type: 'input', name: 'color', message: 'Enter Color' },
            { type: 'input', name: 'make', message: 'Enter Make' },
            { type: 'input', name: 'model', message: 'Enter Model' },
            { type: 'input', name: 'year', message: 'Enter Year' },
            { type: 'input', name: 'weight', message: 'Enter Weight' },
            { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
            { type: 'input', name: 'frontWheelDiameter', message: 'Enter Front Wheel Diameter' },
            { type: 'input', name: 'frontWheelBrand', message: 'Enter Front Wheel Brand' },
            { type: 'input', name: 'rearWheelDiameter', message: 'Enter Rear Wheel Diameter' },
            { type: 'input', name: 'rearWheelBrand', message: 'Enter Rear Wheel Brand' },
        ])
            .then((answers) => {
            const motorbike = new Motorbike_js_1.default(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), [
                new Wheel_js_1.default(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
                new Wheel_js_1.default(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)
            ]);
            this.vehicles.push(motorbike);
            this.selectedVehicleVin = motorbike.vin;
            this.performActions();
        });
    }
    // method to perform actions on a vehicle
    performActions() {
        inquirer_1.default
            .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Select an action',
                choices: [
                    'Print details',
                    'Start vehicle',
                    'Accelerate 5 MPH',
                    'Decelerate 5 MPH',
                    'Stop vehicle',
                    'Turn right',
                    'Turn left',
                    'Reverse',
                    'Select or create another vehicle',
                    'Exit',
                ],
            },
        ])
            .then((answers) => {
            // Logic for actions like print details, start vehicle, accelerate, etc.
            if (answers.action === 'Select or create another vehicle') {
                this.startCli();
            }
            else if (answers.action === 'Exit') {
                this.exit = true;
            }
            else {
                // Perform other actions (e.g., start, accelerate, etc.)
            }
            if (!this.exit) {
                this.performActions(); // Continue performing actions
            }
        });
    }
    // method to start the cli
    startCli() {
        inquirer_1.default
            .prompt([
            {
                type: 'list',
                name: 'CreateOrSelect',
                message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
                choices: ['Create a new vehicle', 'Select an existing vehicle'],
            },
        ])
            .then((answers) => {
            if (answers.CreateOrSelect === 'Create a new vehicle') {
                this.createVehicle();
            }
            else {
                this.chooseVehicle();
            }
        });
    }
}
exports.default = Cli;
