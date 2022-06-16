const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //constructor, That's why it is W and not w
const web3 = new Web3(ganache.provider()); //instance since it's lower case w
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox is being tested', () => {
    // Simple test to see if contract deploys
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
});



/* Practice Testing code
class Car{
    park(){
        return 'stopped';
    }

    drive(){
        return 'vroom';
    }
}

let car; // Creating a var car that will be seen in every it(). let allows the value to be changed. Opp of const

beforeEach(() => {
    car = new Car(); // Will create a new obj car before each it() to be used in that function
});

describe('Car class is being tested', () => {
    it('Testing park function', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('Testing drive function', () => {
        assert.equal(car.drive(), 'vroom');
    })
});
*/