const { auth } = require("./firebase");

exports.authCred = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email);
    var user = {
      uid: null,
      isPresent: false,
    };
    await auth
      .getUserByEmail(email)
      .then((userRecord) => {
        console.log(userRecord);
        user.uid = userRecord.toJSON().uid;
        user.isPresent = true;
      })
      .catch((error) => {
        console.log(error);
        user.isPresent = false;
      });
    console.log(user);
    if (user.isPresent) {
      console.log("creating custom Token");
      await auth
        .createCustomToken(user.uid)
        .then((cToken) => {
          res.status(200).send({ customToken: cToken });
        })
        .catch((error) => {
          console.log(error);
          throw new Error("Failed to create custom token");
        });
    } else {
      await auth
        .createUser({
          email: email,
          emailVerified: true,
          displayName: email,
        })
        .then((userRecord) => {
          user.uid = userRecord.toJSON().uid;
          user.isPresent = true;
        })
        .catch((error) => {
          throw new Error(error.message);
        });

      await auth.createCustomToken(user.uid).then((cToken) => {
        res.status(200).send({ customToken: cToken });
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
