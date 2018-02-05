var ZipToken = artifacts.require("./ZipToken.sol");

contract('ZipToken', function (accounts) {
  /*
  it("should put 1000000000 (one billion) ZIP in the owner's account.", async function () {
    const owner = accounts[0];
    const zip = await ZipToken.new({ from: owner });
    const totalSupply = await zip.totalSupply();
    assert(totalSupply.eq(1000000000*10**18));
  });
    */
  it("should distribute all tokens.", async function () {
    const owner = accounts[0];
    const zip = await ZipToken.new({ from: owner });
    var addresses = ['0x627306090abaB3A6e1400e9345bC60c78a8BEf57', '0xf17f52151EbEF6C7334FAD080c5704D77216b732'];
    var values = [10, 20];
    await zip.distributeTokens(addresses, values);
    var balance = await zip.balanceOf('0xf17f52151EbEF6C7334FAD080c5704D77216b732');
    assert.equal(balance.toString(), '20');
  });
});