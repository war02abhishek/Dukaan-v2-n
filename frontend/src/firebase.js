import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcaDa69pXnnZFVo-5tYCq9KVGgT2ad-f8",
  authDomain: "clone-f80e2.firebaseapp.com",
  projectId: "clone-f80e2",
  storageBucket: "clone-f80e2.appspot.com",
  messagingSenderId: "15349448371",
  appId: "1:15349448371:web:49125bbfe6f35a6ddffac6",
  measurementId: "G-5JMZCF1KZG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//initialising databse
const db = firebaseApp.firestore();
const auth = firebase.auth();


// useFirebase is a named export from the file ./firebase, which is a module that exports a hook that provides access to the Firebase instance. By including this import statement, you can use the useFirebase hook in your component to access the Firebase instance.
 export const useFirebase = () => {
  return firebase;
};

export { db, auth};
