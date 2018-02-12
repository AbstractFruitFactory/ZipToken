const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
var lineReader = require('line-reader');

const readline = require('readline');

function findImports(path) {
    return {
        'contents': fs.readFileSync(path).toString()
    }
}

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('./contracts/ZipToken.sol').toString();
var inputs = {
    'ZipToken.sol': fs.readFileSync('./contracts/ZipToken.sol').toString(),
};

compiledCode = solc.compile({sources: inputs}, 1, findImports);
abiDefinition = JSON.parse(compiledCode.contracts['ZipToken.sol:ZipToken'].interface);
contract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts['ZipToken.sol:ZipToken'].bytecode;

deployedContract = contract.new({ data: byteCode, from: web3.eth.accounts[0], gas: 4700000});

contractInstance = contract.at(deployedContract.address);


var addresses = [];
var values = [];


lineReader.eachLine('sampledata.txt', function(line, last) {
    let address = line.split(',')[0];
    let value = line.split(',')[1];
    addresses.push(address);
    values.push(value);
    if(last){
        distribute();
    }
});

function distribute() {
    contractInstance.distributeTokens(addresses, values, { from: web3.eth.accounts[0] });
    console.log(contractInstance.balanceOf('0xf17f52151ebef6c7334fad080c5704d77216b732'));
}



