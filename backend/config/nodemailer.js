import nodemailer from 'nodemailer';

const  transporter = nodemailer.createTransport({
     host: 'smtp-relay.brevo.com',
     port:  465,
      secure : true,
     auth:{
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASS,
     }
 
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

export default transporter;