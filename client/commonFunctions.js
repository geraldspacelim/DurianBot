const {
  createKeyboardGroup,
  createMediaGroup,
  calculateAmountPayable,
} = require("./helperFunctions");
const { QTY_TYPES, RADIO_TYPES } = require("./enums");
const { nanoid } = require("nanoid");
const axios = require("axios");

function send_start_message(ctx, packagesData) {
  const mediaGroup = createMediaGroup(packagesData);
  const keyboardGroup = createKeyboardGroup(packagesData, "name");
  ctx.replyWithMediaGroup(mediaGroup).then((_) => {
    const startMessage = "Welcome to Smelly Story Bot, how can I help ?"; // Welcome Message
    ctx.reply(startMessage, {
      reply_markup: {
        keyboard: keyboardGroup,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  });
}

function selectQuantity(ctx) {
  const keyboardGroup = createKeyboardGroup(QTY_TYPES, null);
  ctx.reply("How many do you want ?", {
    // Quantity Message
    reply_markup: {
      keyboard: keyboardGroup,
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
}

function additionalOrder(ctx) {
  const currentOrder = ctx.wizard.state.order;
  ctx.wizard.state.orders.push(ctx.wizard.state.order);
  const keyboardGroup = createKeyboardGroup(RADIO_TYPES, null);
  ctx.reply(
    `You have selected:\n\nPackage: ${currentOrder.package}\nWeight: ${currentOrder.size}\nQty: ${currentOrder.quantity}\n\nWould you like to order more?`,
    {
      // Selected Package Message
      reply_markup: {
        keyboard: keyboardGroup,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
}

function send_order_summary(ctx) {
  let ordersMessage = "";
  ctx.wizard.state.orders.map((order, idx) => {
    ordersMessage += `Item ${idx + 1}\nPackage: ${order.package}\nSize: ${
      order.size
    }\nQuantity: ${order.quantity}\n\n`;
  });
  const amountPayable = calculateAmountPayable(ctx.wizard.state.orders);
  ctx.wizard.state.amountPayable = amountPayable;
  const keyboardGroup = createKeyboardGroup(RADIO_TYPES, null);
  ctx.reply(
    `${
      ctx.wizard.state.name
    }, please confirm the following details:\n\n${ordersMessage}Contact: ${
      ctx.wizard.state.contact
    }\nEmail: ${ctx.wizard.state.email}\nDelivery Option: ${
      ctx.wizard.state.deliveryOption
    }\nAddress: ${
      ctx.wizard.state.address
    }\nTotal Amount: $${amountPayable.toFixed(
      2
    )}\n\nDo you have a promo code ?`, // Order Summary Message
    {
      reply_markup: {
        keyboard: keyboardGroup,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
}

function send_payment_details(ctx, is_promo, promo) {
  const reference_code = nanoid(10);
  let congratulatory_message = "";
  let finalAmountPayable =
    ctx.wizard.state.amountPayable + ctx.wizard.state.deliveryFee;
  if (is_promo) {
    finalAmountPayable =
      ctx.wizard.state.amountPayable * ((100 - promo.discount) / 100) +
      ctx.wizard.state.deliveryFee;
    congratulatory_message = `Steady! You are entitled to ${promo.discount}% off.`; // Promo Message
  }
  const keyboardGroup = createKeyboardGroup(RADIO_TYPES, null);
  const finalOrder = {
    telegramId: ctx.from.id,
    orderId: reference_code,
    name: ctx.wizard.state.name,
    contact: parseInt(ctx.wizard.state.contact),
    email: ctx.wizard.state.email,
    address: ctx.wizard.state.address,
    deliveryOption: ctx.wizard.state.deliveryOption,
    orders: ctx.wizard.state.orders,
    amountPayable: parseFloat(finalAmountPayable).toFixed(2),
    promoCode: promo === null ? "" : promo.code,
  };
  ctx.replyWithPhoto(
    {
      source: "./assets/paylah.jpg",
    },
    {
      caption: `${congratulatory_message} Simply make a payment of $${finalAmountPayable} to the QR code above or our UEN Number (53441814K) with the following reference code: ${reference_code}\n\nUpon successful payment, you will receive a telegram notification from us within 5 mins! If you have any queries, please feel free to contact our admins at @smellystory\n\nWould you like to order more?`, // Payment Message
      reply_markup: {
        keyboard: keyboardGroup,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
  return finalOrder;
}

async function submitOrder(finalOrder) {
  axios
    .post("http://localhost:8080/api/v1/order/newOrder", finalOrder)
    .then((_) => {})
    .catch((err) => {
      console.log(err);
    });
}

exports.send_start_message = send_start_message;
exports.selectQuantity = selectQuantity;
exports.additionalOrder = additionalOrder;
exports.send_payment_details = send_payment_details;
exports.send_order_summary = send_order_summary;
exports.submitOrder = submitOrder;
