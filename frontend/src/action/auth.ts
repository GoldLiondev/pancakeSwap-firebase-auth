import axios from 'axios'

const SERVER_URL = 'http://localhost:3200'

export const signUp = (useremail, username) => {
  return axios
    .post(`${SERVER_URL}/register`, { username, useremail })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

export const signIn = (deviceInfo, idToken) =>
  axios
    .post(`${SERVER_URL}/login`, { idToken, ...deviceInfo })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
