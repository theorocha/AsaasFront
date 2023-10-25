import { useState } from "react";
import axios from "axios";

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
        alert("Cliente criado com sucesso.");
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
        alert("Erro ao criar cliente.");
      });
  };

  return (
    <div>
      <h2>Criar Novo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cpfCnpj">CPF/CNPJ:</label>
          <input
            type="text"
            name="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Celular:</label>
          <input
            type="text"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="postalCode">CEP:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Criar Cliente</button>
      </form>
    </div>
  );
}

export default CustomerForm;
