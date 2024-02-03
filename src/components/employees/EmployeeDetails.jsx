import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getSingleEmployee } from "../../data/employeesData";

export default function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    getSingleEmployee(id)?.then(setEmployee);
  }, []);

  //add useEffect here to get the ticket details from the API

  if (!employee) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Employee Name</th>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <th scope="row">Description</th>
          <td>{employee.specialty}</td>
        </tr>
      </tbody>
    </Table>
  );
}
