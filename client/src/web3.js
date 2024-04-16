import Web3 from 'web3';

import AdminStorageContract from './contracts/AdminStorage.json';
import PatientStorageContract from './contracts/PatientStorage.json';

// Initialize Web3 with provider
const web3 = new Web3("http://localhost:8545"); // Update with your Ganache provider URL

// Load contract ABIs
const adminStorageAbstraction = AdminStorageContract;
const patientStorageAbstraction = PatientStorageContract;

// Initialize contract instances
const adminStorageInstance = new web3.eth.Contract(
  adminStorageAbstraction.abi,
  adminStorageAbstraction.networks[5777].address
);

const patientStorageInstance = new web3.eth.Contract(
  patientStorageAbstraction.abi,
  patientStorageAbstraction.networks[5777].address
);

// Interact with contracts
// Example: Get patient count from PatientStorage contract
patientStorageInstance.methods.patientCount().call((error, result) => {
  if (!error) {
    console.log("Patient count:", result);
  } else {
    console.error("Error fetching patient count:", error);
  }
});

// Example: Add a new patient to PatientStorage contract
const newPatientName = "John Doe";
const newPatientAge = 30;
patientStorageInstance.methods
  .addPatient(newPatientName, newPatientAge)
  .send({ from: "<your_account_address>" })
  .then((receipt) => {
    console.log("Transaction receipt:", receipt);
  })
  .catch((error) => {
    console.error("Error adding new patient:", error);
  });
