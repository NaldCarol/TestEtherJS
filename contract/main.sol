// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0 .0;

contract Main {
    address private owner;
    event GetETH(address get, uint256 amount);
    event ReceiveETH(address donar, uint256 amount);

    constructor() payable {
        owner = msg.sender;
        emit ReceiveETH(msg.sender, msg.value);
    }

    receive() external payable {
        emit ReceiveETH(msg.sender, msg.value);
    }

    function queryBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getETH(address payable _to) public payable checkBalance {
        bool sent = _to.send(msg.value);
        require(sent, "Unknown error.");
    }

    modifier checkBalance() {
        require(
            address(this).balance > msg.value,
            "Not enough balance on contract."
        );
        _;
    }
}
