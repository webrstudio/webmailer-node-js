const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.webrstudio.com",
  port: 465,
  secure: true,
  auth: {
    user: "contacto@webrstudio.com",
    pass: "Anotherbrickinthewall_10",
  },
});
const sendEmail = async (req, res) => {
  /*if (
    !req.body ||
    !req.body.user_email ||
    !req.body.user_name ||
    !req.body.user_password ||
    !req.body.payment_amount
  ) {
    return res.status(400).json({
      body:req.body,
      success: false,
      message: "Faltan datos en el cuerpo de la solicitud",
    });
  }*/
  try {
    const message = await transporter.sendMail({
      from: "contacto@webrstudio.com",
      to: req.body.user_email,
      subject: "Registro - Congreso Nacional de Dermatología Pediátrica",
      html: `
                <h2>Tu pago ha sido aprobado</h2>
                <p><strong>Correo:</strong> ${req.body.user_name}</p>
                <p><strong>Contraseña:</strong> ${req.body.user_password}</p>
                <p><strong>Monto:</strong> $${req.body.payment_amount}</p>
            `,
    });

    // Confirmar que el correo fue enviado correctamente
    console.log("Correo enviado con éxito:", message.messageId);

    return res.status(200).json({
      success: true,
      message: "Correo enviado correctamente",
      messageId: message.messageId, // Puedes devolver el ID del mensaje para verificar
    });
  } catch (error) {
    console.error("Error enviando correo:", error);

    // Devolver un mensaje de error detallado
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  sendEmail,
};
