import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAxl6imWvpEXgQ_SIskWr3LukKGELYSRgs",
    authDomain: "messenger-2f3a2.firebaseapp.com",
    projectId: "messenger-2f3a2",
    storageBucket: "messenger-2f3a2.appspot.com",
    messagingSenderId: "789322159374",
    appId: "1:789322159374:web:1820562371fff9505c735f"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db; 