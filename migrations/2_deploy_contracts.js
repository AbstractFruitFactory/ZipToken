var ZipToken = artifacts.require("./ZipToken.sol");
var ZipTokenMock = artifacts.require("./ZipTokenMock.sol");
var Vesting = artifacts.require("./Vesting.sol");


module.exports = function(deployer) {
  deployer.deploy(ZipToken);
  deployer.deploy(ZipTokenMock);
  //deployer.deploy(Vesting);
};