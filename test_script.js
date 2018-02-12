const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

function findImports(path) {
    return {
        'contents': fs.readFileSync(path).toString()
    }
}

web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:9545"));
code = fs.readFileSync('./contracts/ZipToken.sol').toString();

var inputs = {
    'ZipToken.sol': fs.readFileSync('./contracts/ZipToken.sol').toString(),
};

compiledCode = solc.compile({sources: inputs}, 1, findImports);
abiDefinition = JSON.parse(compiledCode.contracts['ZipToken.sol:ZipToken'].interface);
contract = new web3.eth.Contract(abiDefinition);
byteCode = compiledCode.contracts['ZipToken.sol:ZipToken'].bytecode;
//deployedContract = contract.deploy({data: byteCode, from: web3.eth.accounts[0], gas: 4700000});

contract.deploy({
    data: byteCode
})
.send({
    from: web3.eth.accounts[0],
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash){ console.log(error) })
.on('error', function(error){ console.log(error) })
.on('transactionHash', function(transactionHash){ console.log(transactionHash) })
.on('receipt', function(receipt){
   console.log(receipt.contractAddress) // contains the new contract address
})
.on('confirmation', function(confirmationNumber, receipt){ console.log(confirmationNumber) })
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('sampledata')
});
  
var addresses = [];
var values = [];

lineReader.on('line', function (line) {
    let address = line.split(',')[0];
    let value = line.split(',')[1];
    addresses.push(address);
    values.push(value);
});

contract.methods.distributeTokens(addresses, values).send({ from: web3.eth.accounts[0] });

console.log(contract.methods.balanceOf('0xf17f52151ebef6c7334fad080c5704d77216b732').call());


