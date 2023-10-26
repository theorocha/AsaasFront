// Em um arquivo de utilitário ou serviço separado
import axios from "axios";

export async function getCustomerNameById(customerId) {
  try {
    const response = await axios.get(
      `http://localhost:8081/api/customers/${customerId}`
    );
    return response.data.name;
  } catch (error) {
    console.error(error);
    return "Nome não encontrado";
  }
}
