import { Link } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

function Sidebar() {
  return (
    <div
      style={{ backgroundColor: "#0030b9", width: "200px", padding: "1rem" }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/" style={linkStyle}>
            <button style={buttonStyle}>
              <PeopleAltIcon style={imageStyle} /> Clientes
            </button>
          </Link>
        </li>
        <li>
          <Link to="/payments" style={linkStyle}>
            <button style={buttonStyle}>
              <CurrencyExchangeIcon style={imageStyle} /> Cobranças
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  padding: "10px 0",
  cursor: "pointer",
  color: "white",
  textDecoration: "none", // Remove o sublinhado
  fontSize: "16px", // Ajusta o tamanho da fonte
};

const imageStyle = {
  width: "20px",
  marginRight: "10px",
};

const linkStyle = {
  textDecoration: "none", // Remove o sublinhado
};

export default Sidebar;
