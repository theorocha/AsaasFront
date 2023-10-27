import PropTypes from "prop-types";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function PageTemplate({ children }) {
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const contentStyle = {
    flex: 1,
    margin: "2rem",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={pageStyle}>
      <Header />
      <div style={{ display: "flex", height: "calc(100vh - 120px)" }}>
        <Sidebar />
        <div style={contentStyle}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

PageTemplate.propTypes = {
  children: PropTypes.node,
};

export default PageTemplate;
