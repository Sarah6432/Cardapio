import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


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


const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const detalhes = document.getElementById('detalhes').value;
  const imagem = document.getElementById('imagem').files[0];

  if (!imagem) {
    alert('Selecione uma imagem para o prato.');
    return;
  }

  const pratoData = {
    nome: nome,
    preco: preco,
    detalhes: detalhes,
    imagemUrl: `../public/images/${imagem.name}`
  };

  try {
    const pratoId = form.dataset.id;

    if (pratoId) {
  
      const pratoDoc = doc(db, "pratos", pratoId);
      await updateDoc(pratoDoc, pratoData);
      showMessage("Prato atualizado com sucesso!", "formMessage");
    } else {
   
      await addDoc(collection(db, "pratos"), pratoData);
      showMessage("Prato cadastrado com sucesso!", "formMessage");
    }

    form.reset();
    form.removeAttribute("data-id");
    listPratos(); 
  } catch (error) {
    console.error("Erro ao salvar o prato:", error);
    showMessage("Erro ao salvar o prato. Tente novamente.", "formMessage");
  }
});


async function listPratos() {
  const pratosCollection = collection(db, "pratos");
  const pratosSnapshot = await getDocs(pratosCollection);

  const pratosContainer = document.querySelector("#pratos-list");
  pratosContainer.innerHTML = ""; 

  pratosSnapshot.forEach((doc) => {
    const prato = doc.data();
    const pratoItem = `
      <div class="prato-item" data-id="${doc.id}">
        <h3>${prato.nome}</h3>
        <p>Preço: R$${prato.preco}</p>
        <p>${prato.detalhes}</p>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Excluir</button>
      </div>
    `;
    pratosContainer.innerHTML += pratoItem;
  });

  addEventListeners(); 
}


function editPrato(docId) {
  const pratoDoc = doc(db, "pratos", docId);

  getDoc(pratoDoc).then((docSnap) => {
    const prato = docSnap.data();
    document.getElementById("nome").value = prato.nome;
    document.getElementById("preco").value = prato.preco;
    document.getElementById("detalhes").value = prato.detalhes;

    const form = document.querySelector("form");
    form.dataset.id = docId; 
  });
}


async function deletePrato(docId) {
  const pratoDoc = doc(db, "pratos", docId);
  if (confirm("Tem certeza que deseja excluir este prato?")) {
    await deleteDoc(pratoDoc);
    showMessage("Prato excluído com sucesso!", "formMessage");
    listPratos(); 
  }
}

function addEventListeners() {
  const editButtons = document.querySelectorAll(".edit-btn");
  const deleteButtons = document.querySelectorAll(".delete-btn");

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const docId = event.target.closest(".prato-item").dataset.id;
      editPrato(docId);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const docId = event.target.closest(".prato-item").dataset.id;
      deletePrato(docId);
    });
  });
}

listPratos();
