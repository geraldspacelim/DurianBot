function createMediaAndKeyboardGroup(packagesData) {
    let mediaGroup = []
    let keyboardGroup = []
    packagesData.map(package => {
        keyboardGroup.push([{text: package.name}])
        mediaGroup.push({
            type: "photo", 
            media: {source: package.Source},
            caption: package.Caption
        })
    })
    return {mediaGroup, keyboardGroup, packagesSet}
}

exports.createMediaAndKeyboardGroup = createMediaAndKeyboardGroup