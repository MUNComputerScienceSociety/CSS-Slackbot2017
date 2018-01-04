Basic Usage:

Setup API key in config.js created from configBlueprint.js
After running the bot, if a direct message/direct mention/mention is sent to the bot with a search topic, it will reply with a url of the top hit from google news.
Send !help for a brief explanation of the bot.

Installation:

For Linux:

1. Clone this repository

  git clone https://github.com/avinashraja98/CSS-Slackbot2017.git

2. Change directory to CSS-Slackbot2017
  
  cd CSS-Slackbot2017
  
3. Install dependencies

  npm install
  
4. Create config file from configBlueprint.js

  mv configBlueprint.js config.js
 
5. Add token to config.js using preferred text editor

  nano config.js
  
6. run bot.js

  node bot.js
  
