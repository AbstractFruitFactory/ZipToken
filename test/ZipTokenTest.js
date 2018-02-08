import latestTime from 'zeppelin-solidity/test/helpers/latestTime';
import { increaseTimeTo, duration } from 'zeppelin-solidity/test//helpers/increaseTime';

var ZipToken = artifacts.require("./ZipToken.sol");
var TokenVesting = artifacts.require("../node_modules/zeppelin-solidity/contracts/token/ERC20/TokenVesting.sol");

contract('ZipToken', function (accounts) {
  
  it("should put 1000000000 (one billion) ZIP in the owner's account.", async function () {
    const owner = accounts[0];
    const zip = await ZipToken.new({ from: owner });
    const totalSupply = await zip.totalSupply();
    assert(totalSupply.eq(1000000000*10**18));
  });
  
  it("should distribute tokens.", async function () {
    const owner = accounts[0];
    const zip = await ZipToken.new({ from: owner });
    var values = [10, 20];
    var addresses = [accounts[1], accounts[2]];
    await zip.distributeTokens(addresses, values, { from: owner });
    await zip.transferFrom(owner, accounts[1], 10, { from: accounts[1] });
    await zip.transferFrom(owner, accounts[2], 20, { from: accounts[2] });
    var balance1 = await zip.balanceOf(accounts[1]);
    var balance2 = await zip.balanceOf(accounts[2]);
    assert.equal(balance1.toString(), '10');
    assert.equal(balance2.toString(), '20');
  });

  it("should vest tokens.", async function () {
    const owner = accounts[0];
    var start = latestTime() + duration.seconds(1);
    var cliff = duration.seconds(5);
    var total_duration = duration.minutes(1);
    const zip = await ZipToken.new({ from: owner });
    const vesting = await TokenVesting.new(owner, start, cliff, total_duration, true, { from: owner });
    await zip.increaseApproval(owner, 60, { from: owner });
    await zip.transferFrom(owner, vesting.address, 60, { from: owner });
    var vested_amount = await vesting.vestedAmount(zip.address);
    assert.equal(vested_amount.toString(), '0');
    setTimeout(async function callback() {
      vested_amount = await vesting.vestedAmount(zip.address);
      console.log(vested_amount.toString())
      assert(vested_amount.toString() > 0);
    }, 10000);
  })
});