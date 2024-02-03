import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteTicket } from "../../data/serviceTicketsData";
import { completeTicket } from "../../data/serviceTicketsData";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  const delTicket = (id) => {
    if(window.confirm('Are you sure you want to delete this ticket?'))
    {
      deleteTicket(id);
    }
  };

    const compTicket = (id) => {
      if(window.confirm('Are you sure you want to complete this ticket?'))
      {
        completeTicket(id);
      }
    };

  useEffect(() => {
    getServiceTickets()?.then(setTickets);
  }, [ tickets]);

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
            </td>
            <td>
              <Button variant="outline-warning" onClick={() => delTicket(t.id)} className="m-2">
                Delete
              </Button>
            </td>
            {t.employeeId && !t.dateCompleted ? (
            <td>
              <Button variant="outline-warning" onClick={() => compTicket(t.id)} className="m-2">
                Complete
              </Button>
            </td>) : ""
            }
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
