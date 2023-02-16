const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, VERIFY_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: VERIFY_EMAIL };
  await sgMail
    .send(mail)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  return true;
};

module.exports = sendEmail;
