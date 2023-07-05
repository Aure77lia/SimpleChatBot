const
request = require('request'),
express = require('express'),
{chatCompletion} = require('./openaiController'),
axios = require('axios');

require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

let test = (_req, res) => {
    res.send('Hello World');
  };

// Adds support for GET requests to our webhook
let getWebhook = ('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
  
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
  
    console.log("start get webhook");
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      console.log("get webhook first if")
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
  
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        console.log("error with token");
        console.log("informations sent: ");
        console.log("mode: "+mode);
        console.log("token: "+token);
        console.log("challenge: "+challenge);
        res.sendStatus(403);
      }
    }
  });

  // Creates the endpoint for your webhook
let postWebhook = ('/webhook', async (req, res) => {
    let body = req.body;
    console.log("postwebhook start");
  
    // Checks if this is an event from a page subscription
    if (body.object === 'page') {
  
      try {
        let body = req.body;
        let requestType = body.object;
        console.log("request type: "+requestType);
        let senderId = body.entry[0].messaging[0].sender.id;
        let query = body.entry[0].messaging[0].message.text;
        let result = await chatCompletion(query);
        console.log("post result: "+result.response);
        await handleMessage(senderId, result.response);
      } catch (error) {
        console.log("postwebhook: an error occured");
        // console.log(error);
      }
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
  
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  });

  
// Handles messages events
async function handleMessage(senderPsid, receivedMessage) {
    let response;
    console.log("handle message start: "+receivedMessage);
  
    // Checks if the message contains text
    let options = {
      method: 'POST',
      url: `https://graph.facebook.com/v11.0/${PAGE_ID}/messages`,
      params: {
        access_token: PAGE_ACCESS_TOKEN,
        recipient: JSON.stringify({'id': senderPsid}),
        messaging_type: 'RESPONSE',
        message: JSON.stringify({'text': receivedMessage})
      }
    };
    
    response = await axios.request(options);

    if (response['status'] == 200 && response['statusText'] === 'OK') {
      // Send the response message
      callSendAPI(senderPsid, response);
    } else {
        console.error("message could not be sent");
    }
  
  }
  
  // Handles messaging_postbacks events
  function handlePostback(senderPsid, receivedPostback) {
    let response;
  
    // Get the payload for the postback
    let payload = receivedPostback.payload;
  
    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { 'text': 'Thanks!' };
    } else if (payload === 'no') {
      response = { 'text': 'Oops, try sending another image.' };
    }
    // Send the message to acknowledge the postback
    callSendAPI(senderPsid, response);
  }
  
  // Sends response messages via the Send API
  function callSendAPI(senderPsid, response) {
  
    // The page access token we have generated in your app settings
  
    // Construct the message body
    let requestBody = {
      'recipient': {
        'id': senderPsid
      },
      'message': response
    };
  
    // Send the HTTP request to the Messenger Platform
    request({
      'uri': 'https://graph.facebook.com/v2.6/me/messages',
      'qs': { 'access_token': PAGE_ACCESS_TOKEN },
      'method': 'POST',
      'json': requestBody
    }, (err, _res, _body) => {
      if (!err) {
        console.log('Message sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    });
  }
  

  module.exports = {
    test: test,
    getWebhook: getWebhook,
    postWebhook: postWebhook,
  }