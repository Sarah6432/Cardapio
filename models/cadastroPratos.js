import { db, storage } from "./firebaseConfig.js"; // Importando o storage
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js"; 

const form = document.querySelector("#cadastrar-pratos form");
const tabela = document.querySelector("#ver-pedidos tbody");


async function cadastrarPrato(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const detalhes = document.getElementById("detalhes").value;
  const imagem = document.getElementById("imagem").files[0];

  let imagemUrl = ""; 

  if (imagem) {
    try {
      const imagemRef = ref(storage, "pratos/" + imagem.name);
      await uploadBytes(imagemRef, imagem);
      imagemUrl = await getDownloadURL(imagemRef); 
    } catch (error) {
      console.error("Erro ao fazer upload da imagem: ", error);
      return;
    }
  }

  const prato = {
    nome,
    preco,
    detalhes,
    imagem: imagemUrl, 
  };

  try {
    await addDoc(collection(db, "pratos"), prato);
    alert("Prato cadastrado com sucesso!");
    form.reset();
    carregarPratos();
  } catch (error) {
    console.error("Erro ao cadastrar prato: ", error);
  }
}


async function carregarPratos() {
  tabela.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "pratos"));
    querySnapshot.forEach((doc) => {
      const prato = doc.data();
      tabela.innerHTML += `
        <tr data-id="${doc.id}">
          <td>${prato.nome}</td>
          <td>${prato.preco.toFixed(2)}</td>
          <td>${prato.detalhes}</td>
          <td><img src="${prato.imagem}" alt="${prato.nome}" width="50"></td> <!-- Exibe a imagem -->
          <td>
            <button class="editar">Editar</button>
            <button class="deletar">Excluir</button>
          </td>
        </tr>
      `;
    });

    document.querySelectorAll(".editar").forEach((botao) =>
      botao.addEventListener("click", editarPrato)
    );
    document.querySelectorAll(".deletar").forEach((botao) =>
      botao.addEventListener("click", deletarPrato)
    );
  } catch (error) {
    console.error("Erro ao carregar pratos: ", error);
  }
}


async function editarPrato(event) {
  const id = event.target.closest("tr").dataset.id;
  const nome = prompt("Novo nome do prato:");
  const preco = parseFloat(prompt("Novo preço do prato:"));
  const detalhes = prompt("Novos detalhes do prato:");

  if (nome && preco && detalhes) {
    try {
      const pratoRef = doc(db, "pratos", id);
      await updateDoc(pratoRef, { nome, preco, detalhes });
      alert("Prato atualizado com sucesso!");
      carregarPratos();
    } catch (error) {
      console.error("Erro ao editar prato: ", error);
    }
  }
}


async function deletarPrato(event) {
  const id = event.target.closest("tr").dataset.id;

  if (confirm("Tem certeza que deseja excluir este prato?")) {
    try {
      const pratoRef = doc(db, "pratos", id);
      await deleteDoc(pratoRef);
      alert("Prato excluído com sucesso!");
      carregarPratos();
    } catch (error) {
      console.error("Erro ao excluir prato: ", error);
    }
  }
}


form.addEventListener("submit", cadastrarPrato);


document.addEventListener("DOMContentLoaded", carregarPratos);
