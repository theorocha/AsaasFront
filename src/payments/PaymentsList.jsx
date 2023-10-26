import { useState, useEffect } from "react";
import { getCustomerNameById } from "../apis/CustomerAPIs";
import axios from "axios";
import PaymentAct from "./PaymentAct";

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
          <li key={cobranca.id}>
            {customerNames[cobranca.customer]}- {cobranca.customer} -
            {cobranca.billingType} - {cobranca.value} - {cobranca.status}-
            {cobranca.id}
            <PaymentAct billingType={cobranca.billingType} id={cobranca.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentList;
