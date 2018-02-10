pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/TokenVesting.sol";



/**
 * @title TokenVesting
 * @dev A token holder contract that can release its token balance gradually like a
 * typical vesting scheme, with a cliff and vesting period. Optionally revocable by the
 * owner.
 */
contract TokenVestingMock is TokenVesting(msg.sender, 0, 0, 0, true) {

    function setBeneficiary(address beneficiary_) {
        beneficiary = beneficiary_;
    }

    function setStart(uint256 start_) {
        start = start_;
    }

    function setCliff(uint256 cliff_) {
        cliff = cliff_;
    }

    function setDuration(uint duration_) {
        duration = duration_;
    }
}