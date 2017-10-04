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

controller.hears(["Hello"], ["direct_message", "direct_mention", "mention"], (bot, message) => {
  bot.reply(message, 'Hello there!')
})
