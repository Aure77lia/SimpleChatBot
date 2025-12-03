require('dotenv').config();
// const { Configuration, OpenAIApi } = require("openai");
import OpenAI from "openai";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });
// const openai = new OpenAIApi(configuration);

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const chatCompletion = async (query) => {
    console.log("start chatCompletion: "+query+" api key: "+configuration.apiKey);

    try {
        // const chatCompletion = await openai.createChatCompletion({
        //     model: process.env.MODEL_LLM,
        //     messages: [{role: "user", content: query}],
        // });
        const chatCompletion = await client.chat.completions.create({
            model: process.env.MODEL_LLM,
            messages: [{role: "user", content: query}],
        });

        let content = chatCompletion.data.choices[0].message.content;
        console.log("chatCompletion content from response: "+ content);

        return {
            status: 1,
            response: content
        };
    } catch (error) {
        return {
            status: 0,
            response: 'an arror occured'
        };
    }
};

module.exports = {
  chatCompletion
};