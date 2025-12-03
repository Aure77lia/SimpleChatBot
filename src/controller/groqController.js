require('dotenv').config();
const groq = require('groq-sdk');

const client = new groq({apiKey: process.env.GROQ_API_KEY});

const chatCompletion = async (query) => {
    console.log("start chatCompletion: "+query+" api key: "+process.env.GROQ_API_KEY);

    try {
        const chatCompletion = await client.chat.completions.create({
            model: process.env.MODEL_LLM,
            messages: [
                // {role: "system", content: process.env.GROQ_SYSTEM_PROMPT},
                {role: "user", content: query}],
        });

        let content = chatCompletion.choices[0].message.content;
        console.log("chatCompletion content from response: "+ content);

        return {
            status: 1,
            response: content
        };
    } catch (error) {
        console.error("Error in chatCompletion: ", error);
        return {
            status: 0,
            response: 'an arror occured'
        };
    }
};

module.exports = {
  chatCompletion
};