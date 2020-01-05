var firebaseConfig = {
    apiKey: "AIzaSyD5epHdlVuhqvMwecFMstOsUvI_mftIYyM",
    authDomain: "bookstore-pwa-5e53e.firebaseapp.com",
    databaseURL: "https://bookstore-pwa-5e53e.firebaseio.com",
    projectId: "bookstore-pwa-5e53e",
    storageBucket: "bookstore-pwa-5e53e.appspot.com",
    messagingSenderId: "289182761872",
    appId: "1:289182761872:web:2cdbd3fead4883fba0e915",
    measurementId: "G-57783QDBXW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();