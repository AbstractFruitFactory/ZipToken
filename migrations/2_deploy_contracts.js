var ZipToken = artifacts.require("ZipToken");
var ZipTokenMock = artifacts.require("ZipTokenMock");
var Vesting = artifacts.require('TokenVesting');


module.exports = function(deployer, network, accounts) {
  var timestamp = Math.round((new Date()).getTime() / 1000);
  deployer.deploy(ZipToken);
  deployer.deploy(ZipTokenMock);
  deployer.deploy(Vesting, accounts[0], 0, 10, 60, false, { from: accounts[0] });
};