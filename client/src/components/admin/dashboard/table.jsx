import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

export default function App() {
  const data = [
    {
      id: 1,
      serial: 123456,
      age: 30,
      gender: "Male",
      vaccineStatus: "Fully Vaccinated",
      district: "Sample District",
      symptomsDetails: "Sample symptoms details",
      isDead: false,
      createdBy: 1,
      updatedBy: 1,
    },
    // Add more data as needed
  ];

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
