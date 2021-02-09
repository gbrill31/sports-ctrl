const nodemailer = require('nodemailer');
const url = require('../utils/url');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email Server is ready');
  }
});

module.exports = {
  send: (template, user) => {
    return transport.sendMail(
      {
        from: 'test@basktRol.com',
        to: user.email,
        subject: 'First Login',
        text: 'Click on the link below to start initial login',
        html: `<p>Your first login password: <b>${
          user.tempPassword
        }</b></p><a href=${url.siteURL()}/userlogin>Click here for first login</a>`,
      },
      (err, info) => {
        if (err) {
          console.log('No email sent', err);
        } else {
          console.log('Sent Email successfully');
        }
      }
    );
  },
};
