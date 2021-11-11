const {createMediaAndKeyboardGroup} = require("./commonFunctions")

function send_start_message(ctx, packagesData) {
    const media = createMediaAndKeyboardGroup(packagesData)
    ctx.replyWithMediaGroup(media.mediaGroup).then(_=> {
            const startMessage = "Welcome to Durian Head Bot, which package you want?"
            ctx.reply(startMessage, {
                reply_markup: {
                    keyboard: media.keyboardGroup,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            } )
        }
       
    )
}

exports.send_start_message = send_start_message