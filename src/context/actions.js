import axios from "axios";

export function sendAuthApiRequest(formData, url) {
    return new Promise(async (resolve, reject) => {
        try {
             axios.defaults.headers["authorization"]  = localStorage.getItem("token") || ""
            let {data, status} = await axios.post(url, formData)
            if (status === 201) {
                resolve([true, data])
            } else {
                resolve([true, data])
            }

        } catch (ex) {
            let msg = ex?.response?.data?.message
            resolve([false, {}])
        }
    })
}

