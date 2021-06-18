const functions = require('firebase-functions');
const admin = require('firebase-admin');
// var cors = require('cors')
admin.initializeApp();

exports.addAdminRole = functions.https.onRequest((req, res) => {
    console.log(req.body);
    admin.auth().getUserByEmail(req.body.email).then(user => {
        admin.auth().setCustomUserClaims(user.uid,
            {
                admin: true
            });
        res.send('Success! ${data.email} is now a moderator.');
    }).catch((error) => {
        res.send(error);
    })
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
