// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdminStorage {
    struct Admin {
        uint128 id;
        string username;
        string password;
    }
    Admin[] public admins;

    function getAdmin(string memory username, string memory password) public view returns (uint128) {
        for (uint256 i = 0; i < admins.length; i++) {
            if (keccak256(abi.encodePacked(admins[i].username)) == keccak256(abi.encodePacked(username)) &&
                keccak256(abi.encodePacked(admins[i].password)) == keccak256(abi.encodePacked(password))) {
                return admins[i].id;
            }
        }
        revert("Admin not found");
    }

    function getAdminByUsername(string memory username) public view returns (uint128) {
        for (uint256 i = 0; i < admins.length; i++) {
            if (keccak256(abi.encodePacked(admins[i].username)) == keccak256(abi.encodePacked(username))) {
                return admins[i].id;
            }
        }
        revert("Admin not found");
    }

    function createAdmin(uint128 _id, string memory _username, string memory _password) public {
        for (uint256 i = 0; i < admins.length; i++) {
            require(
                keccak256(abi.encodePacked(admins[i].username)) != keccak256(abi.encodePacked(_username)) &&
                admins[i].id != _id,
                "Admin exists, choose different username or ID"
            );
        }
        admins.push(Admin(_id, _username, _password));
    }
}
