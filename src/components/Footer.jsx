function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0030b9",
        height: "60px",
        width: "100%",
        position: "fixed",
        bottom: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "#ccc",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: "10px", margin: "5px 0" }}>
          &copy; 2023 - Todos os direitos reservados
        </p>
        <p style={{ fontSize: "10px", margin: "0" }}>
          Entre em contato pelo e-mail: theomarquesrx@gmail.com.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
