import axios from "axios";

const apiUrl = 'http://192.168.8.107:3001/logs';
const apiUrlNew = 'http://192.168.8.107:3001/logsByIds';

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

export const serviceNew = (startId: string, endId: string, limit: number, loadType: string) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrlNew, {
            startId: startId,
            endId: endId,
            dataLimit: limit,
            loadType: loadType
        }).then((response) => {
            resolve(response.data)
        }).catch(e => {
            reject(e)
        });
    })
}
