import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getSingleTicket } from "../../data/serviceTicketsData";
import { getSingleCustomer } from "../../data/customersData";

export default function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState({});

  useEffect(() => {
    getSingleCustomer(id)?.then(setCustomer);
  }, []);

  //add useEffect here to get the ticket details from the API

  if (!customer) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Customer Name</th>
          <td>{customer.name}</td>
        </tr>
        <tr>
          <th scope="row">Address</th>
          <td>{customer.address}</td>
        </tr>
      </tbody>
    </Table>
  );
}
