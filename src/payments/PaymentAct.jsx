import PropTypes from "prop-types";
import { useState } from "react";
import { generatePixQRCode } from "../apis/PaymentAPI";

function PaymentAct({ billingType, id }) {
  PaymentAct.propTypes = {
    billingType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  const [qrCode, setQrCode] = useState(null);
  const [isQrCodeGenerated, setIsQrCodeGenerated] = useState(false);

  const generateQrCode = () => {
    generatePixQRCode(id)
      .then((qrCodeData) => {
        console.log(qrCodeData);
        setQrCode(qrCodeData.encodedImage);
        setIsQrCodeGenerated(true);
      })
      .catch((error) => {
        alert("Erro ao gerar QR Code.");
        console.error(error);
        setIsQrCodeGenerated(false);
      });
  };

  return (
    <div>
      {billingType === "PIX" && (
        <div>
          {isQrCodeGenerated ? (
            <img src={`data:image/png;base64,${qrCode}`} alt="QR Code do PIX" />
          ) : (
            <div>
              <button onClick={generateQrCode}>Gerar QR Code</button>
              <div>Nenhum QR Code gerado ainda.</div>
            </div>
          )}
        </div>
      )}
      {billingType !== "PIX" && (
        <div>Nenhum QR Code disponível para essa forma de pagamento.</div>
      )}
    </div>
  );
}

export default PaymentAct;
