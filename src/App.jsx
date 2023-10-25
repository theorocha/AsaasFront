import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/customers")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          console.error("Os dados da API não são uma matriz.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {Array.isArray(data) &&
          data.map((customer) => <li key={customer.id}>{customer.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
