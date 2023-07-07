require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatCompletion = async (query) => {
    console.log("start chatCompletion: "+query+" api key: "+configuration.apiKey);

    try {
        const chatCompletion = await openai.createChatCompletion({
            
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["You:"],

            messages: [
                {role: "system", content: "You are a helpful assistant." },
                {role: "user", content: query},],
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