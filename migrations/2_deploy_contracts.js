var ZipToken = artifacts.require("./ZipToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ZipToken);
};