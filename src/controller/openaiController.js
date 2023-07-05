require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatCompletion = async (req,res) => {
    // console.log("start chatCompletion: "+query+"api key: "+configuration.apiKey);
    
    if (!configuration.apiKey) {
        res.status(500).json({
        error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
        }
        });
        return;
    }

    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req}],
        });
        res.status(200).json({ result: chatCompletion.data.choices[0].message});
        console.log("message sent: "+ res.result.content);
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
            error: {
                message: 'An error occurred during your request.',
            }
            });
        }
    }
};

module.exports = {
  chatCompletion
};