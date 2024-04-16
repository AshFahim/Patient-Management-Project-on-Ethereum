import React from 'react';

import Web3 from 'web3';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import PatientStorageContract from '../contracts/PatientStorage.json';

const web3 = new Web3("http://localhost:8545"); // Update with your Ganache provider URL

const patientStorageAbstraction = PatientStorageContract;
const patientStorageInstance = new web3.eth.Contract(
  patientStorageAbstraction.abi,
  patientStorageAbstraction.networks[5777].address
);
export default function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function GetData() {
      const response = await patientStorageInstance.methods
        .getAllPatients()
        .send({ from: "0x79734a5b356Fa8dCcbcAAF051F6895e84115b11B" });
      setData(response);
      return response;
    }
    GetData();
  }, []);

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Serial</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>Gender</TableColumn>
        <TableColumn>Vaccine Status</TableColumn>
        <TableColumn>District</TableColumn>
        <TableColumn>Symptoms Details</TableColumn>
        <TableColumn>Is Dead</TableColumn>
        <TableColumn>Created By</TableColumn>
        <TableColumn>Updated By</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.serial}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.vaccineStatus}</TableCell>
            <TableCell>{item.district}</TableCell>
            <TableCell>{item.symptomsDetails}</TableCell>
            <TableCell>{item.isDead ? "Yes" : "No"}</TableCell>
            <TableCell>{item.createdBy}</TableCell>
            <TableCell>{item.updatedBy}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
