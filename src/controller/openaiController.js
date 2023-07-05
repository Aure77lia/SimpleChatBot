require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatCompletion = async (query) => {
    console.log("start chatCompletion: "+query);

    try {
        const response = await openai.createChatCompletion(
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: "user", content: "Hello world" }]
            });
        console.log("chatCompletion response : "+response);

        let content = response.data.choices[0].message.content;
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