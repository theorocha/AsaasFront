import PropTypes from "prop-types";
import { useState } from "react";
import {
  generatePixQRCode,
  payPixQRCode,
  generateBoletoCode,
} from "../apis/PaymentAPI";
import { Button } from "react-bootstrap";

function PaymentAct({ billingType, id, value }) {
  PaymentAct.propTypes = {
    billingType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  };

  const [isQrCodeGenerated, setIsQrCodeGenerated] = useState(false);
  const [isBoletoGenerated, setIsBoletoGenerated] = useState(false);
  const [payload, setPayload] = useState(null);
  const [pago, setPago] = useState(false);

  const generateQrCode = () => {
    generatePixQRCode(id)
      .then((qrCodeData) => {
        setPayload(qrCodeData.payload);
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${qrCodeData.encodedImage}`;
        link.download = "qrcode.png";
        link.click();

        setIsQrCodeGenerated(true);
      })
      .catch((error) => {
        alert("Erro ao gerar QR Code.");
        console.error(error);
        setIsQrCodeGenerated(false);
      });
  };

  const generateBoleto = () => {
    generateBoletoCode(id)
      .then((boletoData) => {
        setIsBoletoGenerated(true);
        console.log("Boleto gerado com sucesso:", boletoData);
        const link = document.createElement("a");
        link.href = `data:text/plain;charset=utf-8,${boletoData.barCode}`;
        link.download = "boleto.txt";
        link.click();
      })
      .catch((error) => {
        alert("Erro ao gerar boleto.");
        console.error(error);
        setIsBoletoGenerated(false);
      });
  };

  const handlePagamento = () => {
    const data = {
      qrCode: {
        payload: payload,
      },
      value: parseFloat(value),
    };

    payPixQRCode(data)
      .then((response) => {
        setPago(true);
        alert("Pagamento realizado com sucesso.");
        console.log("Pagamento realizado com sucesso:", response);
      })
      .catch((error) => {
        alert("Erro ao finalizar pagamento." + error.message);
        console.error("Erro ao realizar o pagamento:", error);
      });
  };

  return (
    <div>
      {billingType === "PIX" && (
        <div>
          {isQrCodeGenerated ? (
            !pago ? (
              <>
                <Button disabled className="btn btn-success">
                  QRCode baixado com sucesso.
                </Button>
                <Button
                  style={{ fontSize: "15px" }}
                  className="btn btn-primary ms-3"
                  onClick={handlePagamento}
                  disabled
                >
                  Confirmar Pagamento!
                </Button>
              </>
            ) : (
              <Button disabled className="btn btn-sucess">
                Pagamento Realizado!
              </Button>
            )
          ) : (
            <div>
              <Button
                className="btn btn-primary"
                onClick={generateQrCode}
                style={{ fontSize: "12px", padding: "5px 10px" }}
              >
                Gerar QRCode
              </Button>
            </div>
          )}
        </div>
      )}
      {billingType === "BOLETO" && (
        <div>
          {!isBoletoGenerated ? (
            <Button
              className="btn btn-primary"
              onClick={generateBoleto}
              style={{ fontSize: "12px", padding: "5px 10px" }}
            >
              Gerar Boleto
            </Button>
          ) : (
            <Button disabled className="btn btn-success">
              Boleto gerado com sucesso.
            </Button>
          )}
        </div>
      )}
      {billingType !== "PIX" && billingType !== "BOLETO" && (
        <div>Nenhuma ação disponível para essa forma de pagamento.</div>
      )}
    </div>
  );
}

export default PaymentAct;
