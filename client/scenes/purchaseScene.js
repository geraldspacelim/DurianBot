const WizardScene = require("telegraf/scenes/wizard");
const Composer = require("telegraf/composer");
const { DISCOUNT }  = require("../enums");
const { nanoid } = require('nanoid')
const axios = require('axios');
const {send_start_message} = require('../commonFunctions')

const step1 = async ctx => {
    ctx.wizard.state.orders = []
    axios.get("http://localhost:8080/api/v1/packages/").then(res => {
        const packagesData = res.data
        send_start_message(ctx, packagesData)
        // return ctx.wizard.next()
    }).catch(err => {
        console.log(err)
    })
} 

const step2 = new Composer() 

step2.on('text', ctx => {
    if (ctx.wizard.state.packagesSet.includes(ctx.message.text)) {
        ctx.wizard.state.order = {
            package: ctx.message.text
        }
        if (ctx.match.includes("Package")) {
            ctx.wizard.state.order.size = "N.A."
            selectQuantity(ctx)
            return ctx.wizard.selectStep(3);
        }
    }
    
    ctx.reply("Please choose a size (weight)", {
        reply_markup: {
            keyboard: [
                [
                    { text: "400g" }
                ], 
                [
                    { text: "800g" }
                ], 
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    return ctx.wizard.next()
})

const step3 = new Composer() 

step3.hears(["400g", "800g"], ctx => {
    ctx.wizard.state.order.size = ctx.match
    selectQuantity(ctx)
    return ctx.wizard.next() 
})

function selectQuantity(ctx) {
    ctx.reply("Please select your quantity", {
        reply_markup: {
            keyboard: [
                [
                    { text: "1" },
                    { text: "2" },
                    { text: "3" }
                ], 
                [
                    { text: "4" }, 
                    { text: "5" },
                    { text: "more" }
                ], 
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

const step4 = new Composer() 

step4.hears(["1", "2", "3", "4", "5", "more"], ctx => {
    if (ctx.match !== "more") {
        ctx.wizard.state.order.quantity = ctx.match
        const currentOrder = ctx.wizard.state.order
        ctx.wizard.state.orders.push(ctx.wizard.state.order)
        ctx.reply(`You have selected:\n\nPackage: ${currentOrder.package}\nSize: ${currentOrder.size}\nQty: ${currentOrder.quantity}\n\nWould you like to order more?`, {
            reply_markup: {
                keyboard: [
                    [
                        { text: "Yes" },
                    ], 
                    [
                        { text: "No" }
                    ], 
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
        return ctx.wizard.selectStep(13);
    } else {
        ctx.reply("How many you want?")
        return ctx.wizard.selectStep(12);
    }
})

const step5 = new Composer() 

step5.on('text', ctx => {
    ctx.wizard.state.name = ctx.message.text
    ctx.reply("Please choose a date for delivery", {
        reply_markup: {
            keyboard: [
                [
                    { text: "15-6-21" }
                ], 
                [
                    { text: "17-6-21" }
                ], 
                [
                    { text: "19-6-21" }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    return ctx.wizard.next()
})

const step6 = new Composer() 
 
step6.hears(["15-6-21", "17-6-21", "19-6-21"], ctx => {
    ctx.wizard.state.date = ctx.match
    ctx.reply("Which timeslot do you want?", {
        reply_markup: {
            keyboard: [
                [
                    { text: "Normal Delivery: $10.00" }
                ], 
                [
                    { text: "Express Delivery (within 1hr): $13.50" }
                ], 
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    return ctx.wizard.next()
})

const step7 = new Composer() 

step7.hears(["Normal Delivery: $10.00", "Express Delivery (within 1hr): $13.50"], ctx => {
    ctx.wizard.state.timeslot = ctx.match
    ctx.reply("what is your contact number?")
    return ctx.wizard.next()
})

const step8 = new Composer() 

step8.on("text", ctx => {
    const contactRegex = new RegExp(/^\d{8}$/);
    if (!contactRegex.test(ctx.message.text)) {
        const currentStepIndex = ctx.wizard.cursor;
        ctx.reply(
          "Please enter a valid contact number."
        );
        return ctx.wizard.selectStep(currentStepIndex);
    }
    ctx.wizard.state.contact = ctx.message.text
    ctx.reply("What is your address?")
    return ctx.wizard.next();
})

const step9 = new Composer() 

step9.on("text", ctx => {
    ctx.wizard.state.address = ctx.message.text
    let ordersMessage = ""
    
    ctx.wizard.state.orders.map((order, idx) => {
            ordersMessage += `Item ${idx+1}\nPackage: ${order.package}\nSize: ${order.size}\nQuantity: ${order.quantity}\n\n`
    })
    ctx.reply(`${ctx.wizard.state.name}, please confirm the following details:\n\n${ordersMessage}Delivery Date: ${ctx.wizard.state.date}\nDelivery Time: ${ctx.wizard.state.timeslot}\nAddress: ${ctx.wizard.state.address}\nTotal Amount: ${ctx.wizard.state.price}\n\nDo you have a promo code?`, 
    {
        reply_markup: {
            keyboard: [
                [
                    { text: "No" }
                ], 
                [
                    { text: "Yes" }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    return ctx.wizard.next();
})

const step10 = new Composer() 

step10.hears(["Yes", "No"], ctx => {
    if (ctx.match === "Yes" ) {
        ctx.reply("Please enter your promo code")
        return ctx.wizard.next()
    } 
    const is_promo = false
    send_payment_detials(ctx, is_promo)
    return ctx.wizard.selectStep(11);
})

const step11 = new Composer() 

step11.on("text", ctx => {
    if (ctx.message.text === "PROMO") {
        // apply promo code 
        const is_promo = true
        ctx.wizard.state.price = 0.9 * ctx.wizard.state.price
        send_payment_detials(ctx, is_promo)
        return ctx.wizard.next();
    } 
    ctx.reply("Wrong Promo Code").then((_) => {
        let ordersMessage = ""
        ctx.wizard.state.orders.map((order, idx) => {
            ordersMessage += `Item ${idx + 1}\nPackage: ${order.package}\nSize: ${order.size}\nQuantity: ${order.quantity}\n\n`
        })
        ctx.reply(`${ctx.wizard.state.name}, please confirm the following details:\n\n${ordersMessage}Delivery Date: ${ctx.wizard.state.date}\nDelivery Time: ${ctx.wizard.state.timeslot}\nAddress: ${ctx.wizard.state.address}\nTotal Amount: ${ctx.wizard.state.price}\n\nDo you have a promo code?`, 
        {
            reply_markup: {
                keyboard: [
                    [
                        { text: "No" }
                    ], 
                    [
                        { text: "Yes" }
                    ]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    }) 
    return ctx.wizard.selectStep(9);
})

const step12 = new Composer() 

step12.hears(["Yes", "No"],  ctx => {
    if (ctx.match === "Yes") {
        send_start_message(ctx)
        return ctx.wizard.selectStep(1);
    }
    ctx.reply(`Thank you ${ctx.wizard.state.name} for using durian bot. If you have anything just pm me @Kaijiunn`)
    return ctx.scene.leave() 
})

const step13 = new Composer()

step13.on("text", ctx => {
    if (isNaN(ctx.message.text)) {
        const currentStepIndex = ctx.wizard.cursor;
        ctx.reply(
          "Please enter a valid number."
        );
        return ctx.wizard.selectStep(currentStepIndex);
    }
    ctx.wizard.state.quantity = ctx.message.text 
    ctx.reply(`You have selected ${ctx.wizard.state.package} ${ctx.wizard.state.size} - ${ctx.wizard.state.quantity}, I need some information from you. What is your name?`)
    return ctx.wizard.selectStep(4);
})

const step14 = new Composer()

step14.hears(["Yes", "No"], ctx => {
    if (ctx.match === "Yes") {
        ctx.wizard.state.order = {}
        send_start_message(ctx)
        return ctx.wizard.selectStep(1);
    }
    ctx.reply("I need some information from you. What is your name?")
    return ctx.wizard.selectStep(4)
})

function send_payment_detials(ctx, is_promo) {
    const reference_code = nanoid() 
    let congratulatory_message = ""
    if (is_promo) {
        congratulatory_message = "Congrats! You are entitled to 10% off. "
    }
    ctx.replyWithPhoto({
        source: "./assets/paylah.jpg"
    }, {
        caption: `${congratulatory_message}Simple make a payment of $${ctx.wizard.state.price} to the following account with the following reference_code: ${reference_code}\n\nUpon successful payment, you will receive a telegram notification from us. If you have any queries, please feel free to contact me at @Kaijiunn.\n\nWould you like to order again?`,
        reply_markup: {
            keyboard: [
                [
                    { text: "No" }
                ], 
                [
                    { text: "Yes" }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

const purchaseScene = new WizardScene(
    "purchaseScene", ctx => step1(ctx), 
                            step2,
                            step3,
                            step4,
                            step5,
                            step6,
                            step7,
                            step8,
                            step9,
                            step10,
                            step11,
                            step12,
                            step13,
                            step14
);

module.exports = {purchaseScene}