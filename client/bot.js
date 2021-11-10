require('dotenv').config()
const Telegraf = require('telegraf')
const enums = require("./enums.js");
const bot = new Telegraf(process.env.BOT_TOKEN)
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const { purchaseScene  } = require('./scenes/purchaseScene.js')

const stage = new Stage([purchaseScene])
bot.use(session())
bot.use(stage.middleware())
bot.start(ctx => ctx.scene.enter('purchaseScene'))
bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))