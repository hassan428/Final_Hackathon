const nodemailer = require("nodemailer");
const { SERVICE_PASSWORD, ADMIN_EMAIL } = process.env;
const year = new Date().getFullYear();
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 465,
  service: "gmail",
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: ADMIN_EMAIL,
    pass: SERVICE_PASSWORD,
  },
});
async function email_send(email, username, otp_code) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"M.HASSAN " ${ADMIN_EMAIL}`, // sender address
    to: email, // list of receivers
    subject: `OTP Verification`, // Subject line
    text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Confirmation</title>
    <link href="https://fonts.googleapis.com/css2?family=Poller+One&display=swap" rel="stylesheet">
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            animation: fadeIn 2s ease-out;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 90%;
            margin: 10px auto;
            padding: 10px;
            animation: fadeIn 3s ease-out;
        }
        .header {
            background-color: #756EF3;
            padding: 15px;
            text-align: center;
            color: white;
            border-radius: 5px 5px 0 0;
        }
        .header h1 {
            margin: 0;
            font-family: 'Poller One', sans-serif;
            font-size: 2em;
            color: white;
        }
        .content {
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
        }
        .footer {
            padding: 10px;
            text-align: center;
            color: white;
            font-size: 0.8em;
            background-color: #756EF3;
            border-radius: 0 0 5px 5px;
        }
        a {
            color: #007bff;
        }
        a:hover {
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Taskcy</h1>
        </div>
        <div class="content">
            <h3>Hi ${username},</h3>
            <p>Thank you for choosing Taskcy.</p>
            <p>We've received a request to access your account from a new device. Please confirm your identity by entering the One-Time Password (OTP) below:</p>
            <p><strong>OTP Code:</strong> ${otp_code}</p>
            <p>This OTP is valid for 2 minutes and is meant for your use only. Please do not share this code with anyone.</p>
            <p>If you did not request this OTP, please re-sign up with the correct credentials!</p>
            <p><strong>Note:</strong> This OTP is for verification purposes only.</p>
        </div>
        <div class="footer">
            <p>&copy; ${year} Taskcy. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
  });

  //   console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = { email_send };
