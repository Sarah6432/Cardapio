import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const db = getFirestore(app);

export { db };

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = 'block';
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;
  const nome = document.getElementById('nome').value;

  const [firstName, lastName] = nome.split(' ');

  const auth = getAuth(app);
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        nome: nome,
        senha:password,
        uid: user.uid
      };

      showMessage('Cadastro realizado com sucesso!', 'signUpMessage');

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = 'carrinho.html';
        })
        .catch((error) => {
          console.error("Erro ao salvar o documento:", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email já cadastrado', 'signUpMessage');
      } else {
        showMessage('Não foi possível realizar o cadastro', 'signUpMessage');
      }
    });
});