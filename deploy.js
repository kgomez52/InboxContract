const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

// Purpose of HDWalletProvider is to connect to some netowrk and unlock an account on that network to be used
// Using out 12 word Mnemonic phrase
// infura is connecting to a free local network that doesnt require one to host a local node
const provider = new HDWalletProvider(
    'keep job expect desert okay unusual reunion surprise danger provide burst life',
    'https://rinkeby.infura.io/v3/f813665d0b004b1f8cfda082d0692b6c'
);

// Copy of web3 being used to connect to rinkeby network
const web3 = new Web3(provider);

// await can only be used inside function so this function is just a helper so that we may use await
const deploy = async () => {
    // Getting a list of accounts
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    //Deploying contract
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
};
deploy();