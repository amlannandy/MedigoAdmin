import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import credentials from './firebaseCredentials';

const firebaseConfig = {
  apiKey: credentials.apiKey,
  authDomain: credentials.authDomain,
  databaseURL: credentials.databaseURL,
  projectId: credentials.projectId,
  storageBucket: credentials.storageBucket,
  messagingSenderId: credentials.messagingSenderId,
  appId: credentials.appId,
  measurementId: credentials.measurementId,
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
