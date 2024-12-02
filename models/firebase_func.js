import { auth, db } from './firebase_fe.js';

export function createAccount(email, senha, nome) {
    auth.createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
        const user = userCredential.user;
        return db.collection('users').doc(user.uid).set({
            nome: nome,
            email: email
        });
      })
    .then(() => {
        alert('Compra finalizada com sucesso');
        window.location.href = "/index.html";
        return true;
    })
    .catch((error) => {
        if(error.code === 'auth/email-already-in-use'){
            alert( 'Email ja em uso');
        }
        else if(error.code === 'auth/weak-password'){
            alert('Senha muito fraca');
        }
        else if(error.code === 'auth/invalid-email'){
            alert('Email invalido');
        }
    });
}

export function login(email, senha) {
    return auth.signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        return true; 
      })
      .catch((error) => {
        alert( 'Erro no Login');
        return false; 
      });
}