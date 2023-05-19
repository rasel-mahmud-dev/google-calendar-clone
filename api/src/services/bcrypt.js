import * as bcryptjs from "bcryptjs"


export function createHashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let salt = bcryptjs.genSaltSync(12)
            let hash = bcryptjs.hash(password, salt)
            resolve(hash)
        } catch (ex) {
            resolve("Hash generate fail")
        }
    })
}


export function comparePassword(password: string, hashPassword: string): Promise<any> {
    return bcryptjs.compare(password, hashPassword)
}