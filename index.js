const express = require("express");
const bodyParser = require("body-parser");
const { authCred } = require("./createauthcred");
const { sendEmail } = require("./sendEmail");
const cors = require("cors")({ origin: true });
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);

app.post("/sendemail", sendEmail);
app.post("/getcred", authCred);
app.listen(5000, () => {
  console.log(`port started on 5000`);
});
