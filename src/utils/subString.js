
function subString(value = "", char) {
    return value.length > char ? value.substring(0, char) + "..." : value
}

export default subString