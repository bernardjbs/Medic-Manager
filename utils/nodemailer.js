const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const clientId = process.env.NODEMAIL_CLIENT_ID;
const clientSecret = process.env.NODEMAIL_CLIENT_SECRET;
const refreshToken = process.env.NODEMAIL_REFRESH_TOKEN;
const email = process.env.NODEMAIL_EMAIL

const Oauth2_client = new OAuth2(clientId, clientSecret);
Oauth2_client.setCredentials({ refresh_token: refreshToken });

const sendMail = async (emailTo, content) => {
  try {
    const accessToken = await Oauth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: email,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: `MEDIC MANAGER <${email}>`,
      to: `${emailTo}`,
      subject: 'Hello from MEDIC MANAGER',
      text: 'YOUR MEDICATION - PANADOL - IS EXPIRING IN 3 DAYS',
      html: `<h1>${content}</h1>`
    }

    // send mail with defined transport object
    const result = await transport.sendMail(mailOptions);
    return result;

  } catch (error) {
    return error;
  };
}

module.exports = { sendMail }