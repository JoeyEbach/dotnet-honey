import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getEmployees } from "../../data/employeesData";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  console.warn(employees);

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Specialty</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e) => (
          <tr key={`employee-${e.id}`}>
            <th scope="row">{e.id}</th>
            <td>{e.name}</td>
            <td>{e.specialty}</td>
            <td>
              <Link to={`${e.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
