var ZipToken = artifacts.require("./ZipToken.sol");

contract('ZipToken', function (accounts) {
  
  it("should put 1000000000 (one billion) ZIP in the owner's account.", async function () {
    const owner = accounts[0];
    const zip = await ZipToken.new({ from: owner });
    const totalSupply = await zip.totalSupply();
    assert(totalSupply.eq(1000000000*10**18));
  });
  
/*

  it("should send coin correctly", async function () {
    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    account_one_starting_balance = (await meta.getBalance.call(account_one)).toNumber();
    account_two_starting_balance = (await meta.getBalance.call(account_two)).toNumber();
    await meta.sendCoin(account_two, amount, { from: account_one });
    account_one_ending_balance = (await meta.getBalance.call(account_one)).toNumber();
    account_two_ending_balance = (await meta.getBalance.call(account_two)).toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
*/
});