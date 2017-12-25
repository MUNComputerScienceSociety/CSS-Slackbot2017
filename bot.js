const Botkit = require('botkit')
const config = require('./apiconfig')

const search = require('./searchArticles.js')

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

controller.hears([".*"], ["direct_message", "direct_mention", "mention"], (bot, message) => {

    search(message.text, callback)

    function callback(result) {
        bot.reply(message, result[1].url)
    }
})