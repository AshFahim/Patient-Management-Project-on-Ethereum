import React, { useState } from 'react';

import Web3 from 'web3';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';

import PatientStorageContract from '../contracts/PatientStorage.json';

const web3 = new Web3("http://localhost:8545"); // Update with your Ganache provider URL
const patientStorageAbstraction = PatientStorageContract;
const patientStorageInstance = new web3.eth.Contract(
  patientStorageAbstraction.abi,
  patientStorageAbstraction.networks[5777].address
);

export default function PatientSignupForm() {
  const [formData, setFormData] = useState({
    id: "",
    serial: "",
    age: "",
    gender: "",
    district: "",
    symptomsDetails: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientStorageInstance.methods
        .createPatientByPatient(
          formData.id,
          formData.serial,
          formData.age,
          formData.gender,
          formData.district,
          formData.symptomsDetails
        )
        .send({ from: "0x79734a5b356Fa8dCcbcAAF051F6895e84115b11B" });
      console.log("Patient created successfully!");
      // Reset form data if needed
      setFormData({
        id: "",
        serial: "",
        age: "",
        gender: "",
        district: "",
        symptomsDetails: "",
        createdBy: "",
      });
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return (
    <Card className="mx-20">
      <CardHeader>Register as a Patient</CardHeader>
      <CardBody className="p-12">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="number"
            name="id"
            label="ID"
            placeholder="Enter patient ID"
            value={formData.id}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="serial"
            label="Serial"
            placeholder="Enter serial number"
            value={formData.serial}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="age"
            label="Age"
            placeholder="Enter patient age"
            value={formData.age}
            onChange={handleChange}
          />
          <Select
            name="gender"
            label="Gender"
            placeholder="Select gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <SelectItem value="0">Male</SelectItem>
            <SelectItem value="1">Female</SelectItem>
            <SelectItem value="2">Other</SelectItem>
          </Select>
          <Select
            name="vaccineStatus"
            label="Vaccine Status"
            placeholder="Select vaccine status"
            value={formData.vaccineStatus}
            onChange={handleChange}
          >
            <SelectItem value={0}> Not Vaccinated </SelectItem>
            <SelectItem value={1}> Partially Vaccinated (1st Dose) </SelectItem>
            <SelectItem value={2}> Full Vaccinated (2nd Dose) </SelectItem>
          </Select>
          <Input
            type="text"
            name="district"
            label="District"
            placeholder="Enter district"
            value={formData.district}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="symptomsDetails"
            label="Symptoms Details"
            placeholder="Enter symptoms details"
            value={formData.symptomsDetails}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="createdBy"
            label="Created By"
            placeholder="Enter ID of creator"
            value={formData.createdBy}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="updatedBy"
            label="Updated By"
            placeholder="Enter ID of updater"
            value={formData.updatedBy}
            onChange={handleChange}
          />
          <Button color="primary">Submit</Button>
        </form>
      </CardBody>
    </Card>
  );
}
