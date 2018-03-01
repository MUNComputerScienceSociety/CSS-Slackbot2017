const Botkit = require('botkit')
const config = require('./config')

const controller = Botkit.slackbot();

const bot = controller.spawn({
  token: config.token
})

bot.startRTM((err, bot, payload) => {
  if(err){
    throw new Error('Failed to connect to Slack!')
  }
})

// Objects required for markov chains
const Markov = require('./mymarkov');
const readline = require('readline');
const fs = require('fs');
var markov = new Markov();

// Seed the markov chains
const rl = readline.createInterface({
    input: fs.createReadStream(config.markovseed)
});

rl.on('line', (line) => {
    var lines = line.split(".");
    for(var i=0; i<lines.length; i++) {
        markov.add(lines[i]);
    }
});

// Reply with markov chains
controller.hears([".*"], ["direct_message", "direct_mention", "mention"], (bot, message) => {
    bot.reply(
      message, markov.generateTopicSentence(message.text)
    );
});


controller.hears(["Hello"], ["direct_message", "direct_mention", "mention"], (bot, message) => {
  bot.reply(message, 'Hello there!')
})
