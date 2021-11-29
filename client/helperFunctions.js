function createMediaGroup(packagesData) {
    let mediaGroup = []
    packagesData.map(package => {
        mediaGroup.push({
            type: "photo", 
            media: {source: package.source},
            caption: package.caption
        })
    })
    return mediaGroup 
}

function createKeyboardGroup(data, type) {
    let keyboardGroup = []
    data.map(d => {
        if (type === null) {
            keyboardGroup.push([{text: d}])
        } else {
            keyboardGroup.push([{text: d[type]}])
        }
    })
    return keyboardGroup
}

function calculateAmountPayable(orders) {
    let amountPayable = 0
    orders.map((order) => {
        amountPayable += order.price * order.quantity
    })
    return amountPayable
}

exports.createMediaGroup = createMediaGroup
exports.createKeyboardGroup = createKeyboardGroup
exports.calculateAmountPayable = calculateAmountPayable
