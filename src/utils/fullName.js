function fullName(user = {}){
    let name = ""
    if(user?.firstName){
        name  = user.firstName
    }
    if(user?.lastName){
        name += user.lastName
    }
    return name
}

export default fullName