const {createKeyboardGroup, createMediaGroup, calculateAmountPayable} = require("./helperFunctions")
const {QTY_TYPES, RADIO_TYPES} = require("./enums")
const { nanoid } = require("nanoid");
const axios = require('axios');

function send_start_message(ctx, packagesData) {
    const mediaGroup = createMediaGroup(packagesData) 
    const keyboardGroup = createKeyboardGroup(packagesData, "name")
    ctx.replyWithMediaGroup(mediaGroup).then(_=> {
            const startMessage = "Welcome to Durian Head Bot, which package you want?"
            ctx.reply(startMessage, {
                reply_markup: {
                    keyboard: keyboardGroup,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            } )
        }
    )
}


function selectQuantity(ctx) {
    const keyboardGroup = createKeyboardGroup(QTY_TYPES, null)
    ctx.reply("Please select your quantity", {
        reply_markup: {
            keyboard:keyboardGroup,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

function additionalOrder(ctx) {
    const currentOrder = ctx.wizard.state.order
    ctx.wizard.state.orders.push(ctx.wizard.state.order)
    const keyboardGroup = createKeyboardGroup(RADIO_TYPES, null)
    ctx.reply(`You have selected:\n\nPackage: ${currentOrder.package}\nSize: ${currentOrder.size}\nQty: ${currentOrder.quantity}\n\nWould you like to order more?`, {
        reply_markup: {
            keyboard: keyboardGroup,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

function send_order_summary(ctx) {
    let ordersMessage = ""
    ctx.wizard.state.orders.map((order, idx) => {
            ordersMessage += `Item ${idx+1}\nPackage: ${order.package}\nSize: ${order.size}\nQuantity: ${order.quantity}\n\n`
    })
    const amountPayable = calculateAmountPayable(ctx.wizard.state.orders)
    ctx.wizard.state.amountPayable = amountPayable
    const keyboardGroup = createKeyboardGroup(RADIO_TYPES, null)
    ctx.reply(`${ctx.wizard.state.name}, please confirm the following details:\n\n${ordersMessage}Contact: ${ctx.wizard.state.contact}\nDelivery Option: ${ctx.wizard.state.deliveryOption}\nAddress: ${ctx.wizard.state.address}\nTotal Amount: $${amountPayable.toFixed(2)}\n\nDo you have a promo code?`, 
    {
        reply_markup: {
            keyboard:keyboardGroup,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

function send_payment_details(ctx, is_promo, promo) {
    const reference_code = nanoid() 
    let congratulatory_message = ""
    let finalAmountPayable = ctx.wizard.state.amountPayable + ctx.wizard.state.deliveryFee
    if (is_promo) {
        finalAmountPayable =  ((ctx.wizard.state.amountPayable * ((100-promo.discount)/100) + ctx.wizard.state.deliveryFee)).toFixed(2) 
        congratulatory_message = `Congrats! You are entitled to ${promo.discount}% off.`
    }
    const keyboardGroup = createKeyboardGroup(RADIO_TYPES, null)
    const finalOrder = {
        name: ctx.wizard.state.name,
        contact: parseInt(ctx.wizard.state.contact),
        address: ctx.wizard.state.address, 
        deliveryOption: ctx.wizard.state.deliveryOption, 
        orders: ctx.wizard.state.orders,
        amountPayable:  parseFloat(finalAmountPayable),
        promoCode: promo.code 
    }
    ctx.replyWithPhoto({
        source: "./assets/paylah.jpg"
    }, {
        caption: `${congratulatory_message}Simple make a payment of $${finalAmountPayable} to the following account with the following reference_code: ${reference_code}\n\nUpon successful payment, you will receive a telegram notification from us. If you have any queries, please feel free to contact me at @Kaijiunn.\n\nWould you like to order again?`,
        reply_markup: {
            keyboard: keyboardGroup,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    return finalOrder
}

async function submitOrder(finalOrder) {
    axios.post("http://localhost:8080/api/v1/order/newOrder", finalOrder).then(res => {
        console.log(res) 
    }).catch(err => {
        console.log(err)
    })
}

exports.send_start_message = send_start_message
exports.selectQuantity = selectQuantity
exports.additionalOrder = additionalOrder
exports.send_payment_details = send_payment_details
exports.send_order_summary = send_order_summary
exports.submitOrder = submitOrder
