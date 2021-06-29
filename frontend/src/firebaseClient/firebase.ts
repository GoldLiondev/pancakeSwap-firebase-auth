import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'your api key',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}

firebase.initializeApp(firebaseConfig)

export default firebase
