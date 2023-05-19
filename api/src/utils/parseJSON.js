function parseJSON(str = "") {
    return new Promise((resolve, reject) => {
        try {
            let data = JSON.parse(str || "")
            resolve(data)
        } catch (ex) {
            resolve(null)
        }
    })
}

module.exports = parseJSON