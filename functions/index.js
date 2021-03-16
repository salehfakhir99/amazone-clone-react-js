const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")
('sk_test_51IUIaHEn6AdwJXWGsxHadUVV0xsmMPylUohFYiuRnQwW2zwMPnTHlnKzHi00MHSyDem8kn9MGi8vfZYK0AHzhWml00YQlZwfDZ');
// api

//app config
const app = express();
/// middlewares
app.use(cors({origin : true}));
app.use(express.json()); 

//api route
app.get('/',(request , response)=> response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('payment request reseved!! BOOOOM >>>>>>>>>>>>>', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency : "usd",
    });
    response.status(201).send({
        clientSecret : paymentIntent.client_secret ,
    })
})
// listen command
exports.api = functions.https.onRequest(app)





///end point
///http://localhost:5001/cloneama/us-central1/api

