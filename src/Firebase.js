import  firebase  from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyBlNeVr-m_M9s6GHuNKSUhreQV4Yrk_lqk",
    authDomain: "cloneama.firebaseapp.com",
    databaseURL: "https://cloneama.firebaseio.com",
    projectId: "cloneama",
    storageBucket: "cloneama.appspot.com",
    messagingSenderId: "683712118897",
    appId: "1:683712118897:web:e86ad65995fbd3d7d21bd0",
  };
   const firebaseApp = firebase.initializeApp(firebaseConfig);
   const db = firebaseApp.firestore();
   const auth = firebase.auth(); 
   export { db ,auth};