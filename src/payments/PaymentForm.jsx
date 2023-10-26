import { useState } from "react";
import axios from "axios";

function PaymentForm() {
  const [formData, setFormData] = useState({
    customer: "",
    billingType: "",
    value: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const floatValue = parseFloat(formData.value);
    setFormData({
      ...formData,
      value: floatValue,
    });

    console.log(formData);
    axios
      .post("http://localhost:8081/api/payments", formData)
      .then(function (response) {
        const cobrancaId = response.data.id;
        alert("Cobrança gerada com sucesso. ID da cobrança: " + cobrancaId);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
        alert("Erro ao gerar cobrança.");
      });
  };

  return (
    <div>
      <h2>Criar Nova Cobrança</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer">Customer:</label>
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="billingType">Tipo de cobrança:</label>
          <input
            type="text"
            name="billingType"
            value={formData.billingType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="value">Valor:</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Data de Vencimento:</label>
          <input
            type="text"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Criar Cliente</button>
      </form>
    </div>
  );
}

export default PaymentForm;
