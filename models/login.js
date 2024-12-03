import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMDuFnNwp1mVlRVPotB_NkBvmbmNWxTf4",
  authDomain: "restaurante-82ef5.firebaseapp.com",
  projectId: "restaurante-82ef5",
  storageBucket: "restaurante-82ef5.firebasestorage.app",
  messagingSenderId: "1056580102450",
  appId: "1:1056580102450:web:e3dfaca294d96455ef8f2b",
  measurementId: "G-B682R8KLZ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Compra realizada com sucesso!');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});