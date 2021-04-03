const admin = require("firebase-admin");
const serviceaccount = require("./serviceaccount.json") // get json file from firebase console
admin.initializeApp({
  projectId: serviceaccount.project_id,
  credential: admin.credential.cert(serviceaccount),
  serviceAccountId:
    serviceaccount.client_email, //Tt is used for creating firebase auth credentials
});
exports.auth = admin.auth();
