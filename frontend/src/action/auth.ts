import axios from 'axios'

const SERVER_URL = 'http://localhost:3200'

export const signUp = (useremail, username, password) => {
  return axios
    .post(`${SERVER_URL}/register`, { username, useremail, password })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

export const signIn = (useremail, password, deviceInfo) =>
  axios
    .post(`${SERVER_URL}/login`, { useremail, password, ...deviceInfo })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
