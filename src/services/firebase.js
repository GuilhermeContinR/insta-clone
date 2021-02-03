import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCRbXJACLQ960NTwg1F2qRkvOKVlVSskEk",
    authDomain: "insta-clone-e0039.firebaseapp.com",
    databaseURL: "https://insta-clone-e0039-default-rtdb.firebaseio.com",
    projectId: "insta-clone-e0039",
    storageBucket: "insta-clone-e0039.appspot.com",
    messagingSenderId: "48586828074",
    appId: "1:48586828074:web:608274dffb4ffe1b9a1653",
    measurementId: "G-4P2E7CVLBJ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


// export default db;