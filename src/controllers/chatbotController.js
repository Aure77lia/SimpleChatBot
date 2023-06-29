const { config } = require("dotenv");

require("dotenv").config();

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;

let test = (req, res) => {
    return res.send("yop");
};

let getWebhook = (req,res) =>{
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === MY_VERIFY_TOKEN) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}
let postWebhook = (req,res) =>{
    let body = req.body;

    // Checks this is an event from a page subscription

    if (body.object === "page") {

        // Iterates over each entry
        body.entry.forEach(function(entry){
            // Gets the message, entry.messaging is an array
            // even though, it will contain only one message (index 0)
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
    }else{
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
    
    
}

function handleMessage (sender_psid, received_message){

}

function handlePostback (sender_psid, received_postback){
    
}

function callSendAPI (sender_psid, response){
    
}

module.exports = {
    test: test,
    getWebhook: getWebhook,
    postWebhook: postWebhook,
}