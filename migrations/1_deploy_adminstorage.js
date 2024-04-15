const AdminStorage = artifacts.require("./AdminStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(AdminStorage);
};