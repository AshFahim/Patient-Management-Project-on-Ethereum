/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./AdminStorage.sol"; // Import the Admin contract

contract PatientStorage {
    AdminStorage adminContract; // Declare an instance of the AdminStorage contract

    constructor(address _adminContractAddress) {
        adminContract = AdminStorage(_adminContractAddress); // Initialize the adminContract with the provided address
    }

    enum VaccineStatus {
        not_vaccinated,
        one_dose,
        two_dose
    }

    enum Gender {
        male,
        female
    }

    struct Patient {
        uint256 id;
        uint256 serial;
        uint128 age;
        Gender gender;
        VaccineStatus vaccineStatus;
        string district;
        string symptomsDetails;
        bool isDead;
        uint128 createdBy;
        uint128 updatedBy;
    }

    Patient[] public patients;

    function createPatientByPatient(uint128 _id, uint256 _serial, uint128 _age, Gender _gender, string memory _district, string memory _symptomsDetails ) public {
        patients.push(Patient(_id, _serial, _age, _gender, VaccineStatus.not_vaccinated, _district, _symptomsDetails, false, 0, 0));
    }
    function createPatientByAdmin(uint128 _id, uint128 _serial, uint128 _age, Gender _gender, string memory _district, string memory _symptomsDetails, string memory AdminUsername ) public {
        uint128 adminID = adminContract.getAdminByUsername(AdminUsername);
        patients.push(Patient(_id, _serial, _age, _gender, VaccineStatus.not_vaccinated, _district, _symptomsDetails, false, adminID, adminID ));
    }

    function getPatient(uint256 serial) public view returns (uint256, uint128, Gender, VaccineStatus, string memory, string memory, bool) {
        for (uint256 i = 0; i < patients.length; i++) {
            if (patients[i].serial == serial) {
                Patient memory patient = patients[i];
                return (patient.id, patient.age, patient.gender, patient.vaccineStatus, patient.district, patient.symptomsDetails, patient.isDead);
            }
        }
        revert("Patient not found");
    }

    function deletePatient(uint256 serial) public returns (bool) {
        for (uint256 i = 0; i < patients.length; i++) {
            if (patients[i].serial == serial) {
                if (i != patients.length - 1) {
                    patients[i] = patients[patients.length - 1];
                }
                patients.pop();
                return true;
            }
        }
        // If the loop finishes without finding the patient, revert with an error message
        revert("Patient not found");
    }


    function getAllPatients() public view returns (Patient[] memory) {
        return patients;
    }

    function updatePatient(uint256 serial, uint128 _age, Gender _gender, string memory _district, string memory _symptomsDetails) public returns(bool) {
        for (uint256 i = 0; i < patients.length; i++) {
            if (patients[i].serial == serial) {
                patients[i].age = _age;
                patients[i].gender = _gender;
                patients[i].district = _district;
                patients[i].symptomsDetails = _symptomsDetails;
                return true;
            }
        }
        revert("Patient not found");
    }


    function updatePatientByAdmin(
        uint256 serial, 
        uint128 _age, 
        Gender _gender, 
        VaccineStatus _vaccineStatus, 
        string memory _district, 
        string memory _symptomsDetails, 
        bool _isDead, 
        string memory AdminUsername
    ) public {
        for (uint256 i = 0; i < patients.length; i++) {
            if (patients[i].serial == serial) {
                uint128 adminId = adminContract.getAdminByUsername(AdminUsername);
                patients[i].age = _age;
                patients[i].gender = _gender;
                patients[i].vaccineStatus = _vaccineStatus;
                patients[i].district = _district;
                patients[i].symptomsDetails = _symptomsDetails;
                patients[i].isDead = _isDead;
                patients[i].updatedBy = adminId;
                return;
            }
        }
        // If the loop finishes without finding the patient, revert with an error message
        revert("Patient not found");
    }

}
