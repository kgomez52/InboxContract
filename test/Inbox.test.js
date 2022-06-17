const assert = require('assert');
const ganache = require('ganache-cli'); // Hosts a local test network
const Web3 = require('web3'); //constructor, That's why it is W and not w | Portal to web3 world
const web3 = new Web3(ganache.provider()); //instance since it's lower case w
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INITIAL_STRING]})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox is being tested', () => {
    // Simple test to see if contract deploys
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    // Test to see if the contract has a default message
    // .call() is used anytime we want to call a function. It is read-only and instant
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    // Test to see if the message can change (modifying contracts data (Transaction))
    // .send() says we want to make changes to data inside the contract and we have to wait. Also has to specify who's paying for transaction
    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
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