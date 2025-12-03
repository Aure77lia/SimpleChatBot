# SimpleChatBot
A simple chatBot on messenger. You can ask him anything.

## Installation

1. You can git clone or download the files of the repo.

2. This bot requires Node.js, you can install it on the official link https://nodejs.org/en

3. You will need to setup a variables file. Duplicate `.env.example` and rename to `.env`. Set the variables below.

### Variables importantes

- PORT  
  - Port sur lequel votre bot tourne (par défaut : 8080).

- PAGE_ACCESS_TOKEN  
  - Token d'accès de la page Facebook (voir les étapes Meta for Developers dans la section originale).

- MY_VERIFY_TOKEN  
  - Token de verification webhook (string générée par vous).

- PAGE_ID  
  - ID de votre page Facebook.

- OPENAI_API_KEY (optionnel)  
  - Si vous utilisez encore l'API OpenAI.

- GROQ_API_KEY  
  - Clé API pour groq-sdk (Groq). Ajoutez-la dans `.env` si vous utilisez Groq.

- GROQ_SYSTEM_PROMPT  
  - Texte qui sera envoyé en tant que message "system" à Groq (contexte / instructions globales pour le modèle).  
  - Exemple : GROQ_SYSTEM_PROMPT="You are a concise coding assistant. Answer in French."

- MODEL_LLM  
  - Nom du modèle à utiliser (ex: "groq-1" ou ce que votre fournisseur indique).

Exemple minimal `.env` :
```env
PORT=8080
PAGE_ACCESS_TOKEN=your_page_access_token
MY_VERIFY_TOKEN=your_verify_token
PAGE_ID=your_page_id
GROQ_API_KEY=sk-...
GROQ_SYSTEM_PROMPT=You are a concise coding assistant. Answer in French.
MODEL_LLM=groq-1
```

4. Installation des dépendances  
```bash
yarn
# ou
npm install
```
Si vous utilisez Groq explicitement, assurez-vous que `groq-sdk` est installé (il peut déjà figurer dans package.json) :
```bash
yarn add groq-sdk
# ou
npm install groq-sdk
```

5. Lancer le serveur  
```bash
node app.js
```

Notes
- Le projet envoie maintenant le contexte global à Groq via la variable `GROQ_SYSTEM_PROMPT` (env). Cette valeur est ajoutée comme premier message avec le rôle "system" avant le message utilisateur.
- Conservez `OPENAI_API_KEY` si vous utilisez à la fois OpenAI et Groq; sinon seules les variables GROQ_* sont nécessaires.
- Si besoin, je peux appliquer les modifications du README directement dans le dépôt.