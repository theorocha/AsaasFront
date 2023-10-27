import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import PageTemplate from "../components/PageTemplate";
import { Link } from "react-router-dom";

function CustomerList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/customers")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columnStyle = {
    padding: "0.5rem 1rem",
  };

  return (
    <PageTemplate>
      <div style={{ width: "100%" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Lista de Clientes</h1>
          <Link to="/newCustomer">
            <Button variant="primary">Novo Cliente</Button>
          </Link>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={columnStyle}>ID</th>
              <th style={columnStyle}>Nome</th>
              <th style={columnStyle}>CPF</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr key={customer.id}>
                <td style={columnStyle}>{customer.id}</td>
                <td style={columnStyle}>{formataNome(customer.name)}</td>
                <td style={columnStyle}>{formatCPF(customer.cpfCnpj)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </PageTemplate>
  );
}

function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formataNome(nome) {
  const palavras = nome.toLowerCase().split(" ");
  const nomeFormatado = palavras
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");

  return nomeFormatado;
}

export default CustomerList;
