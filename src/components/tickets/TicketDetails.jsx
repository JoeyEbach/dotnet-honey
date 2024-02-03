import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { Form, Button } from 'react-bootstrap';
import { getSingleTicket } from "../../data/serviceTicketsData";
import { getEmployees } from "../../data/employeesData";
import { assignTicket } from "../../data/serviceTicketsData";

const initialState = {
  employeeId: null,
}

export default function TicketDetails() {
  const { id } = useParams();
  const [input, setInput] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const [employees, setEmployees] = useState([]);
  const [ticket, setTicket] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    assignTicket(id, formInput.employeeId);
    setInput(false);
  };

  useEffect(() => {
    getEmployees()?.then(setEmployees);
    getSingleTicket(id)?.then(setTicket);
  }, [ticket]);

  //add useEffect here to get the ticket details from the API

  if (!ticket) {
    return null;
  }

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th scope="row">Customer</th>
            <td>{ticket.customer?.name}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{ticket.description}</td>
          </tr>
          <tr>
            <th scope="row">Emergency</th>
            <td>{ticket.emergency ? "yes" : "no"}</td>
          </tr>
          <tr>
            <th scope="row">Employee</th>
            <td>{ticket.employee?.name || "Unassigned"}</td>
          </tr>
          <tr>
            <th scope="row">Completed?</th>
            <td>{ticket.dateCompleted?.split("T")[0] || "Incomplete"}</td>
          </tr>
        </tbody>
      </Table>

      <Button variant="outline-warning" onClick={() => setInput(true)}>
        {ticket.employeeId ? "Reassign" : "Assign"}
      </Button>

      {input ? (

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Select
                  name="employeeId"
                  value={formInput.employeeId}
                  className="select rounded-0"
                  onChange={handleChange}
                >
                  <option value="">Select A Employee</option>
                  {employees?.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button
                className="rounded-0 stratSubmit"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
      ) : (
        ""
      )}
    </>
  );
}
