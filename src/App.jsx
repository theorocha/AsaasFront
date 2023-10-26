import { useState, useEffect } from "react";
import axios from "axios";
import CustomerForm from "./customer/CustomerForm";
import PaymentList from "./payments/PaymentsList";

function App() {
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

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {data.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
      <CustomerForm />
      <PaymentList />
    </div>
  );
}

export default App;
