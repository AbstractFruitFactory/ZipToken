var ZipToken = artifacts.require("./ZipToken.sol");
var ZipTokenMock = artifacts.require("./ZipTokenMock.sol");


module.exports = function(deployer) {
  deployer.deploy(ZipToken);
  deployer.deploy(ZipTokenMock);
};