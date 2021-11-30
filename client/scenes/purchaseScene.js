const WizardScene = require("telegraf/scenes/wizard");
const Composer = require("telegraf/composer");
const axios = require('axios');
const { DELIVERY_TYPES, RADIO_TYPES, QTY_TYPES }  = require("../enums");
const {send_start_message, selectQuantity, send_payment_details, send_order_summary, additionalOrder, submitOrder} = require('../commonFunctions')
const {createKeyboardGroup} = require('../helperFunctions')


const step1 = async ctx => {
    ctx.wizard.state.orders = []
    axios.get("http://localhost:8080/api/v1/shop/").then(res => {
        const shopData = res.data[0]
        ctx.wizard.state.promos = shopData.promos
        const packagesData = shopData.products
        ctx.wizard.state.packages = packagesData
        send_start_message(ctx, packagesData)
        return ctx.wizard.next()
    }).catch(err => {
        console.log(err)
    })
} 

const step2 = new Composer() 

step2.on("text", ctx => {
    const packageObj = ctx.wizard.state.packages.find(o => o.name === ctx.message.text) 
    if (packageObj) {
        ctx.wizard.state.selectedPackage = packageObj
        ctx.wizard.state.order = {package: packageObj.name}
        if (ctx.message.text.includes("Package")) {
            ctx.wizard.state.order.size = "N.A."
            ctx.wizard.state.order.price = packageObj.details[0].price
            selectQuantity(ctx)
            return ctx.wizard.selectStep(3);
        }
        const keyboardGroup = createKeyboardGroup(packageObj.details, "size")
        ctx.reply("Please choose a size (g)", { // Package Size Message
            reply_markup: {
                keyboard: keyboardGroup,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })

        return ctx.wizard.next()
    }
})

const step3 = new Composer() 

step3.on("text", ctx => {
    const package = ctx.wizard.state.selectedPackage.details.find(o => o.size === ctx.message.text)
    if (package) {
        ctx.wizard.state.order.size = package.size
        ctx.wizard.state.order.price = package.price
        selectQuantity(ctx)
        return ctx.wizard.next()
    }
})

const step4 = new Composer() 

step4.hears(QTY_TYPES, ctx => {
    if (ctx.match !== "more") {
        ctx.wizard.state.order.quantity = parseInt(ctx.match) 
        additionalOrder(ctx)
        return ctx.wizard.selectStep(13);
    } else {
        ctx.reply("How many you want?") // Select Custom Quantity Message
        return ctx.wizard.selectStep(12);
    }
})

const step5 = new Composer() 

step5.on('text', ctx => {
    ctx.wizard.state.name = ctx.message.text
    const keyboardGroup = createKeyboardGroup(DELIVERY_TYPES, null)
    ctx.reply("Please choose a delivery option", { // Select Delivery Option Message
        reply_markup: {
            keyboard: keyboardGroup,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    return ctx.wizard.next()
})

const step6 = new Composer() 

step6.hears(DELIVERY_TYPES, ctx => {
    ctx.wizard.state.deliveryOption = ctx.match
    const index = DELIVERY_TYPES.indexOf(ctx.match)
    if (index === 1) {
        ctx.wizard.state.deliveryFee = 10 
    } else {
        ctx.wizard.state.deliveryFee = 13.5
    }
    ctx.reply("what is your contact number?") // Contact Number Message
    return ctx.wizard.next()
})

const step7 = new Composer()

step7.on("text", ctx => {
    const contactRegex = new RegExp(/^\d{8}$/);
    if (!contactRegex.test(ctx.message.text)) {
        const currentStepIndex = ctx.wizard.cursor;
        ctx.reply(
          "Please enter a valid contact number." // Valid Contact Number Message
        );
        return ctx.wizard.selectStep(currentStepIndex);
    }
    ctx.wizard.state.contact = ctx.message.text
    ctx.reply("What is your email?")  // Email Message
    return ctx.wizard.next();
})

const step8 = new Composer() 

step8.on("text", ctx => {
    const emailRegex = new RegExp(/\S+@\S+\.\S+/);
    if (!emailRegex.test(ctx.message.text)) {
        const currentStepIndex = ctx.wizard.cursor;
        ctx.reply(
          "Please enter a valid email address." // Valid Email Message
        );
        return ctx.wizard.selectStep(currentStepIndex);
    }
    ctx.wizard.state.email = ctx.message.text
    ctx.reply("What is your address?") // Address Message
    return ctx.wizard.next();
})

const step9 = new Composer() 

step9.on("text", ctx => {
    ctx.wizard.state.address = ctx.message.text
    send_order_summary(ctx)
    return ctx.wizard.next();
})

const step10 = new Composer() 

step10.hears(RADIO_TYPES, async ctx => {
    if (ctx.match === "Yes" ) {
        ctx.reply("Please enter your promo code") // Promo Code Message
        return ctx.wizard.next()
    } 
    const is_promo = false
    const finalOrder =  send_payment_details(ctx, is_promo, null)
    await submitOrder(finalOrder)
    return ctx.wizard.selectStep(11);
})

const step11 = new Composer() 

step11.on("text", async ctx => {
    const promo = ctx.wizard.state.promos.find(o => o.code === ctx.message.text)
    if (promo) {
        const is_promo = true
        const finalOrder = send_payment_details(ctx, is_promo, promo)
        await submitOrder(finalOrder)
        return ctx.wizard.next();
    } 
    ctx.reply("Wrong Promo Code").then((_) => { // Wrong Promo Code Message
        send_order_summary(ctx)
        return ctx.wizard.selectStep(9);
    }) 
   
})

const step12 = new Composer() 

step12.hears(RADIO_TYPES,  ctx => {
    if (ctx.match === "Yes") {
        send_start_message(ctx)
        return ctx.wizard.selectStep(1);
    }
    ctx.reply(`Thank you ${ctx.wizard.state.name} for using durian bot. If you have anything just pm me @Kaijiunn`) // Thank you Message
    return ctx.scene.leave() 
})

const step13 = new Composer()

step13.on("text", ctx => {
    if (isNaN(ctx.message.text)) {
        const currentStepIndex = ctx.wizard.cursor;
        ctx.reply(
          "Please enter a valid number." // Valid Number Message
        );
        return ctx.wizard.selectStep(currentStepIndex);
    }
    ctx.wizard.state.order.quantity = parseInt(ctx.message.text)
    additionalOrder(ctx)
    return ctx.wizard.next();
})

const step14 = new Composer()

step14.hears(RADIO_TYPES, ctx => {
    if (ctx.match === "Yes") {
        ctx.wizard.state.order = {}
        send_start_message(ctx, ctx.wizard.state.packages)
        return ctx.wizard.selectStep(1);
    }
    ctx.reply("I need some information from you. What is your name?") // Name Message
    return ctx.wizard.selectStep(4)
})



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
                            step14,
);

module.exports = {purchaseScene}