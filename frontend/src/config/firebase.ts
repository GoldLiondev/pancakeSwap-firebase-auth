import firebase from 'firebase'

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export default firebase
