import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDWmBY7hVzum2vxaEBacrxc6rxFU__dWk8',
  authDomain: 'pancake-swap-69cf2.firebaseapp.com',
  projectId: 'pancake-swap-69cf2',
  storageBucket: 'pancake-swap-69cf2.appspot.com',
  messagingSenderId: '222422792554',
  appId: '1:222422792554:web:addfe02e9d84306b964d13',
  measurementId: 'G-QNQSN9W00C',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export default firebase
