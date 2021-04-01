import axios from "axios";

const apiUrl = 'http://localhost:3001/logs';

export const service = (startDateTime: string, endDateTime: string, limit: number, loadType: string) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrl, {
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            dataLimit: limit,
            loadType: loadType
        }).then((response) => {
            resolve(response.data)
        }).catch(e => {
            reject(e)
        });
    })
}
