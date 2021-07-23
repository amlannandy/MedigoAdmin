import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const doctorsCollection = db.collection('doctors');
const usersCollection = db.collection('users');
const clinicsCollection = db.collection('clinics');
const appointmentsCollection = db.collection('appointments');

export {
  auth,
  db,
  doctorsCollection,
  usersCollection,
  clinicsCollection,
  appointmentsCollection,
};
