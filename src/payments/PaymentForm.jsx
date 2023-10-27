import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import PageTemplate from "../components/PageTemplate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PaymentForm() {
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
  const [formData, setFormData] = useState({
    customer: "",
    billingType: "",
    value: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dueDate: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const floatValue = parseFloat(formData.value);
    setFormData({
      ...formData,
      value: floatValue,
    });

    formData.dueDate = formData.dueDate.toISOString().split("T")[0];

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
    <PageTemplate>
      <div>
        <h2>Criar Nova Cobrança</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Cliente:</Form.Label>
            <Form.Control
              as="select"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um Cliente</option>
              {data.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  Nome: {formataNome(customer.name)} - CPF/CNPJ:{" "}
                  {formatCPF(customer.cpfCnpj)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Tipo de Cobrança:</Form.Label>
            <Form.Control
              as="select"
              name="billingType"
              value={formData.billingType}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o Tipo</option>
              <option value="BOLETO">Boleto</option>
              <option value="PIX">PIX</option>
              <option value="CREDIT_CARD">Cartão de Crédito</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Valor:</Form.Label>
            <Form.Control
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="my-2 d-flex flex-column">
            <Form.Label>Data de Vencimento:</Form.Label>
            <div style={{ maxWidth: "200px" }}>
              <DatePicker
                selected={formData.dueDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                required
              />
            </div>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Criar Cobrança
          </Button>
        </Form>
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

export default PaymentForm;
