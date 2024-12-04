import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

async function finalizarPedido() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const resumo = {
        subtotal: document.getElementById('sub-total-preco').textContent,
        entrega: document.getElementById('valor-entrega').textContent,
        total: document.getElementById('total-preco').textContent
    };

    const cliente = {
        nome: document.getElementById('name').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('phone').value
    };

    try {
        await addDoc(collection(db, "pedidos"), {
            cliente: cliente,
            produtos: cart,
            resumo: resumo,
            data: new Date().toISOString()
        });

        alert("Pedido finalizado com sucesso!");
        localStorage.removeItem('cart'); 
        window.location.reload(); 
    } catch (error) {
        console.error("Erro ao salvar pedido: ", error);
        alert("Erro ao finalizar o pedido. Tente novamente.");
    }
}