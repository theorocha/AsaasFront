import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import getCustomerNameById from "../apis/CustomerAPIs";
import PageTemplate from "../components/PageTemplate";
import PaymentAct from "./PaymentAct";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function PaymentList() {
  const [data, setData] = useState([]);
  const [customerNames, setCustomerNames] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/payments")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    async function fetchCustomerNames() {
      const names = {};
      for (const cobranca of data) {
        const name = await getCustomerNameById(cobranca.customer);
        names[cobranca.customer] = name;
      }
      setCustomerNames(names);
    }

    fetchCustomerNames();
  }, [data]);

  const columnStyle = {
    padding: "0.5rem 1rem",
  };

  return (
    <PageTemplate>
      <div style={{ width: "100%" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Lista de Cobranças</h1>
          <Link to="/newPayment">
            <Button variant="primary">Nova Cobrança</Button>
          </Link>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={columnStyle}>Nome do Cliente</th>
              <th style={columnStyle}>ID do Cliente</th>
              <th style={columnStyle}>Tipo de Cobrança</th>
              <th style={columnStyle}>Valor</th>
              <th style={columnStyle}>Status</th>
              <th style={columnStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cobranca) => (
              <tr key={cobranca.id}>
                <td style={columnStyle}>{customerNames[cobranca.customer]}</td>
                <td style={columnStyle}>{cobranca.customer}</td>
                <td style={columnStyle}>{cobranca.billingType}</td>
                <td style={columnStyle}>R${cobranca.value}</td>
                <td style={columnStyle}>{cobranca.status}</td>
                <td style={columnStyle}>
                  <PaymentAct
                    billingType={cobranca.billingType}
                    value={cobranca.value}
                    id={cobranca.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </PageTemplate>
  );
}

export default PaymentList;
