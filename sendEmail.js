const sng = require("@sendgrid/mail");
sng.setApiKey(
  "SENDGRID_API_KEY" // put your sendgrid api key here
);
exports.sendEmail = async (req, res) => {
  try {
    var string = "0123456789"; // strings combination from which OTP code will
    //generate modify to get alphanumeric or special characters
    var otp = "";
    var lenght = string.length;
    for (let a = 0; a < 6; a++) {
      //this block of for loop will create a 6-digit code
      otp += string[Math.floor(Math.random() * lenght)];
    }
    const msg = {
      to: req.body.emailID,
      from: { email: "SENDGRID_SENDER_EMAIL", name: "Suraj" }, //put your sendgrid sender in email
      //field and custom name in name field
      subject: "Firebase Auth OTP",
      text: "OTP for signin/signup",
      html: `Your OTP for Firebase Auth with email ::: ${otp}`,
    };
    sng
      .send(msg)
      .then(() => {
        res.status(200).send({ message: otp });
      })
      .catch((error) => {
        console.log(error.message);
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
