import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
  

async function carregarPedidosDoCliente(emailCliente) {
    try {
        const pedidosRef = collection(db, "pedidos");
        const q = query(pedidosRef, where("cliente.email", "==", emailCliente));
        const querySnapshot = await getDocs(q);

        const pedidosContainer = document.getElementById('pedidos-container');
        pedidosContainer.innerHTML = '';

        querySnapshot.forEach(doc => {
            const pedido = doc.data();
            const pedidoElement = document.createElement('div');
            pedidoElement.className = 'pedido';

            pedidoElement.innerHTML = `
                <h3>Pedido realizado em: ${new Date(pedido.data).toLocaleString()}</h3>
                <p><strong>Subtotal:</strong> ${pedido.resumo.subtotal}</p>
                <p><strong>Entrega:</strong> ${pedido.resumo.entrega}</p>
                <p><strong>Total:</strong> ${pedido.resumo.total}</p>
                <h4>Produtos:</h4>
                <ul>
                    ${pedido.produtos.map(produto => `
                        <li>
                            <img src="${produto.image}" alt="${produto.title}" height="50px">
                            <strong>${produto.title}</strong> - ${produto.price}
                        </li>
                    `).join('')}
                </ul>
            `;
            pedidosContainer.appendChild(pedidoElement);
        });
    } catch (error) {
        console.error("Erro ao carregar pedidos: ", error);
        alert("Erro ao carregar seus pedidos.");
    }
}
