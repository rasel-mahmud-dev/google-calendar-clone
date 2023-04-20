function withStopPropagation(e, cb) {
    e.preventDefault()
    e.stopPropagation();
    return cb
}


export default withStopPropagation