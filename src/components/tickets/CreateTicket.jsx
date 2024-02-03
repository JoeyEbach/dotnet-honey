import { useEffect, useState } from 'react';
import { createTicket } from '../../data/serviceTicketsData';
import { PropTypes } from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { getEmployees } from '../../data/employeesData';
import { getCustomers } from '../../data/customersData';

const initialState = {
  customerId: null, 
  employeeId: null,
  description: "",
  emergency: false,
}

export default function CreateTicket(sTicket) {
  const [formInput, setFormInput] = useState(initialState);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getEmployees()?.then(setEmployees);
    getCustomers()?.then(setCustomers);
    if (sTicket.id) {
      setFormInput(sTicket);
    }
  }, [sTicket]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormInput((prevValue) => ({
    ...prevValue,
    [name]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (sTicket.id) {
    updateTicket(formInput);
  } else {
    const payload = formInput;
    console.warn(payload);
    createTicket(payload);
  }
}

  return (
  <>
  <h3>Submit a Ticket</h3>
  <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Customer</Form.Label>
          <Form.Select
            name="customerId"
            value={formInput.customerId}
            onChange={handleChange}
            className="rounded-0"
            required
          >
              <option value="">Select A Customer</option>
              {customers?.map((customer) => (
                <option 
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name}
                </option>  
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Employee</Form.Label>
          <Form.Select
            name="employeeId"
            value={formInput.employeeId}
            className="select rounded-0"
            onChange={handleChange}
          >
            <option value="">Select A Employee</option>
            {employees?.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
               >
                {employee.name}
               </option> 
            ))}
          </Form.Select> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter The Service Ticket Description"
            name="description"
            className="rounded-0"
            value={formInput.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="switch"
            label="Emergency?"
            name="emergency"
            checked={formInput.emergency}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                emergency: e.target.checked,
              }));
            }}
          />
        </Form.Group>
        <Button className="rounded-0 stratSubmit" variant="primary" type="submit">
         Submit
        </Button>
      </Form>
    </div>
  </>
)};

CreateTicket.propTypes = {
  sTicket: PropTypes.shape({
    id: PropTypes.number,
    customerId: PropTypes.number,
    employeeId: PropTypes.number,
    description: PropTypes.string,
    emergency: PropTypes.bool,
    dateCompleted: PropTypes.shape,
  }),
};

CreateTicket.defaultProps = {
  sTicket: initialState,
};
