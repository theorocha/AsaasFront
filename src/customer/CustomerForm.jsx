import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PageTemplate from "../components/PageTemplate";

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: "",
    cpfCnpj: "",
    email: "",
    mobilePhone: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:8081/api/customers", formData)
      .then(function (response) {
        alert(`Cliente com id ${response.data.id} criado com sucesso.`);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
        alert("Erro ao criar cliente.");
      });
  };

  return (
    <PageTemplate>
      <div>
        <h2>Criar Novo Cliente</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>CPF/CNPJ:</Form.Label>
            <Form.Control
              type="text"
              name="cpfCnpj"
              value={formData.cpfCnpj}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Celular:</Form.Label>
            <Form.Control
              type="text"
              name="mobilePhone"
              value={formData.mobilePhone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>CEP:</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button className="mt-3" type="submit" variant="primary">
            Criar Cliente
          </Button>
        </Form>
      </div>
    </PageTemplate>
  );
}

export default CustomerForm;
