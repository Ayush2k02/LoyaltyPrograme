
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FlipToken is ERC20 {
    address payable public owner;
    constructor() ERC20("FlipToken","FLT"){
        owner = payable(msg.sender);
        _mint(owner,10000000 * (10 ** decimals()));
    }

     modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}