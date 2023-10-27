function Header() {
  return (
    <header
      style={{
        backgroundColor: "#0030b9",
        height: "60px",
        width: "100%",
        position: "relative",
      }}
    >
      <img
        src="https://briquezi.com.br/wp-content/uploads/2023/02/logo-asaas-azul-.png"
        alt=""
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </header>
  );
}

export default Header;
