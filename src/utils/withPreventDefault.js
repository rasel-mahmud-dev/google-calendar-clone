function withPreventDefault(e, cb){
    e.preventDefault()
    e.stopPropagation();
    return cb
}


export default withPreventDefault