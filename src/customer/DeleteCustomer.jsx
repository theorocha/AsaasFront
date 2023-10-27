import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PropTypes from "prop-types";

function DeleteCustomer({ customerId }) {
  function handleDelete() {
    axios
      .delete(`/api/customers/${customerId}`)
      .then((response) => {
        alert(`Cliente com id ${customerId} excluído com sucesso.`);
        console.log(response.data);
      })
      .catch(function (error) {
        alert("Erro ao excluir cliente");
        console.error("Erro ao excluir cliente.", error);
      });
  }

  return (
    <button disabled onClick={handleDelete} className="btn btn-danger">
      <DeleteOutlineIcon fontSize="small" />
    </button>
  );
}

DeleteCustomer.propTypes = {
  customerId: PropTypes.number.isRequired,
};

export default DeleteCustomer;
