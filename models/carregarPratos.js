import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMDuFnNwp1mVlRVPotB_NkBvmbmNWxTf4",
  authDomain: "restaurante-82ef5.firebaseapp.com",
  projectId: "restaurante-82ef5",
  storageBucket: "restaurante-82ef5.appspot.com",
  messagingSenderId: "1056580102450",
  appId: "1:1056580102450:web:e3dfaca294d96455ef8f2b",
  measurementId: "G-B682R8KLZ7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function carregarPratos() {
  const pratosContainer = document.getElementById("pratos-container");

  try {
    const querySnapshot = await getDocs(collection(db, "pratos"));
    querySnapshot.forEach((doc) => {
      const prato = doc.data();
      pratosContainer.innerHTML += `
        <div class="card" id="${prato.nome}">
                    <img src="${prato.imagem}">
                    <h3>${prato.nome}</h3>
                    <p>${prato.detalhes}</p>
                    <div class="dish-price card-car">
                        <h4>R$${prato.preco}</h4>
                    </div>
                    <button class="pedir-agora">Pedir agora</button>
                </div>
      `;
    });
  } catch (error) {
    console.error("Erro ao carregar os pratos:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarPratos);
