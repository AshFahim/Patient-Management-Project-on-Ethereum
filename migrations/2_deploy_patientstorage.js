const AdminStorage = artifacts.require("AdminStorage");
const PatientStorage = artifacts.require("PatientStorage");

module.exports = async function(deployer) {
  await deployer.deploy(AdminStorage);
  const adminStorageInstance = await AdminStorage.deployed();

  await deployer.deploy(PatientStorage, adminStorageInstance.address);
};