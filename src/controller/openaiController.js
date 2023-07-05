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
            
            model: "gpt-3.5-turbo",
            temperature: 0,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["You:"],

            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {role: "user", content: "Quelle est la recette du bourguignon?"},
                {role: "assistant", content: "Ingrédients: \n- 2 kg de bœuf bourguignon \n- 2 oignons hachés \n- 4 carottes coupées en rondelles \n- 2 gousses d'ail hachées \n- 1 tasse de vin rouge \n- 1 tasse de bouillon de boeuf \n- 2 cuillères à soupe de farine \n- 1 cuillère à café de thym séché \n- 1 cuillère à café de romarin séché \n- Sel et poivre au goût \nInstructions: \n1. Préchauffer le four à 350 degrés F (175 degrés C). \n2. Dans une grande casserole, faire revenir le bœuf dans un peu d'huile jusqu'à ce qu'il soit bien doré. Ajouter les oignons et les carottes et cuire jusqu'à ce qu'ils soient tendres. \n3. Ajouter l'ail, le vin rouge, le bouillon de boeuf, la farine, le thym et le romarin. Saler et poivrer au goût. \n4. Porter à ébullition, puis réduire le feu et laisser mijoter à couvert pendant environ 2 heures. \n5. Servir chaud avec du riz ou des pâtes."},
                {role: "user", content: "Quelle est l'origine du bourguignon?"},
                {role: "assistant", content: "Le bourguignon est un plat traditionnel de la région de Bourgogne, en France. Son histoire remonte à plusieurs siècles.\nLe bourguignon est originaire de la cuisine paysanne de la région, où il était traditionnellement préparé avec les morceaux moins nobles du bœuf. Il s'agit d'un ragoût de viande mijotée lentement dans du vin rouge de Bourgogne, accompagné de légumes comme des oignons, des carottes et des champignons.\nLe bourguignon est aujourd'hui considéré comme un plat emblématique de la cuisine française. Il est apprécié pour sa saveur riche et son tendre morceaux de viande en sauce. Il est généralement servi avec des pommes de terre, des pâtes ou du riz.\nAu-delà de la région de Bourgogne, le bourguignon est également connu et apprécié dans le resto du pays et même à l'international. Il représente la cuisine française traditionnelle et offre une expérience culinaire généreuse et réconfortante."},
            ],
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