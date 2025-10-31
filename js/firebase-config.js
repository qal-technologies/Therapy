import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";


export const firebaseConfig = {
    apiKey: "AIzaSyDSCENVZ1n70oHMy8PLsCl0GlqeA3-i0i4",
    authDomain: "therapy-b0747.firebaseapp.com",
    projectId: "therapy-b0747",
    storageBucket: "therapy-b0747.appspot.com",
    messagingSenderId: "347596881895",
    appId: "1:347596881895:web:9abf0b475d00ce33958742",
    measurementId: "G-6JLFGD96DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    })
});

export { app, db };
