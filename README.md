# SimpleChatBot
A simple chatBot on messenger. You can ask him anything.

## Installation

1. You can git clone or download the files of the repo.

2. This bot require Node.js, you can install it on the official link https://nodejs.org/en

3. Your will need to setup a variables file. You can duplicate .env.example file and change its name for .env. You will need to setup the differents variables with those informations:

### Port
- you can setup on wich port your bot will run. The default value is 8080.

### PAGE_ACCESS_TOKEN
- you will need a page access token. Follow those steps: 
    - create a page that will be your bot (facebook -> create new page -> unable chat)
    - go to meta for developers. Once connected with the same account as your new page, you will create a new app. Select "other", then choose "business". Choose a name for your app and create your new app.
    - You will then add messenger in the product to add  to your page.
    - then go to the parameters of messenger in your new app, scroll down and find "access token". Add you facebook page and generate a new token. That will be you access token.

### MY_VERIFY_TOKEN
- You will need a verify token. It is a string you can generate yourself.

### PAGE_ID
- You can find you page id on your page on facebook. Go to about then to page transparency. You should find your page id.

### OPENAI_API_KEY
- You will also need an onpenai key. Go to openai platform and create or connect with an account. you can then go to your profile, then view API keys and generate a new api key. That will be your openAi key.

4. On meta for developers, on your app you will need to change parameters. 
    - In the webhook section, you will enter a new url. It will be the url that host your bot. The token required is your VERIFY_TOKEN.
    - Once done, below a new section will appear. you will be able to choose when your bot will receive a notification. You will choose "messages".

4. You can install your bot on a free server like Render. You will need to transfer your files and setup the variables of your .env file. In render, a section is made for those. On your server, there is section called environnement. You will be able to save your variables in this section.

5. To launch your server, you will need to install several packages. You can install them with this command:  
```bash
yarn 
```

6. You can launch your server with this command: 

```bash
node app.js 
```


Your Bot is ready ! you can talk to your bot on messenger. Try sending a message to your page.