import axios from 'axios'

const SERVER_URL = 'http://localhost:3200'

export const getUserList = () => {
  return axios
    .get(`${SERVER_URL}/getUserList`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

export const getUserProfile = () => {
  return axios
    .get(`${SERVER_URL}/getProfile`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

export const updateProfile = (data) => {
  return axios
    .post(`${SERVER_URL}/updateProfile`, { ...data })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

export const deleteUser = (email) => {
  return axios
    .post(`${SERVER_URL}/delete`, { email })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

export const updateUser = (data) => {
  return axios
    .post(`${SERVER_URL}/update`, { ...data })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}
