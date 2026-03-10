import Mailgen from "mailgen";
import nodemailer from "nodemailer";
const sendMail = async (options) => {
  console.log("EMAIL:", options.email);
  console.log("SUBJECT:", options.subject);
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  const mail = {
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: options.email,
    subject: options.subject,
    text: emailTextual, // Plain-text version of the message
    html: emailHtml, // HTML version of the message
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed . Make sure you have provided the credentials",
    );
    console.error("Error", error);
  }
};

const emailVerficationMailgenContent = (username, emailVerificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App ! we are excited to have you onboard ",
      action: {
        instructions: "To verify email please click on the button below",
        button: {
          color: "#1b915c",
          text: "Verify your Email",
          link: emailVerificationUrl,
        },
      },
      outro:
        "Need help, or have question? just reply to this mail we'd love to help. ",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account ",
      action: {
        instructions: "To reset your password please click on the button below",
        button: {
          color: "#1b915c",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have question? just reply to this mail we'd love to help. ",
    },
  };
};

export {
  emailVerficationMailgenContent,
  forgotPasswordMailgenContent,
  sendMail,
};
