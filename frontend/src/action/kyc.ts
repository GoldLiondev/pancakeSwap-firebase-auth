import axios from 'axios'

const SERVER_URL = 'http://localhost:3200'

export const getKYC = (data) => {
    return axios
        .post(`${SERVER_URL}/getKYC`, { data })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
}

export const fileUpload = (data) => {
    return axios
        .post(`${SERVER_URL}/upload`, { ...data })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
}

export const saveKYC = (data) => {
    return axios
        .post(`${SERVER_URL}/saveKYC`, { ...data })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
}
