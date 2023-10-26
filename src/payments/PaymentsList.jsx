import { useState, useEffect } from "react";
import { getCustomerNameById } from "../Apis/CustomerAPIs";
import axios from "axios";

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

  return (
    <div>
      <h1>Lista de Cobranças</h1>
      <ul>
        {data.map((cobranca) => (
          <li key={cobranca.customer}>
            {customerNames[cobranca.customer]} - {cobranca.value} -{" "}
            {cobranca.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentList;
