const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "TokoS3blah@gmail.com",
    pass: "kdjdqjyciyyojjef",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
