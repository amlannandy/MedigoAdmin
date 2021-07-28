import 'firebase/auth';
import 'firebase/storage';
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
const storage = firebase.storage();

const doctorsCollection = db.collection('doctors');
const usersCollection = db.collection('users');
const clinicsCollection = db.collection('clinics');
const appointmentsCollection = db.collection('appointments');
const patientsCollection = db.collection('patients');

const getGeopoint = (lat: number, lng: number) =>
  new firebase.firestore.GeoPoint(lat, lng);

export {
  firebase,
  auth,
  db,
  storage,
  doctorsCollection,
  usersCollection,
  clinicsCollection,
  appointmentsCollection,
  patientsCollection,
  getGeopoint,
};
