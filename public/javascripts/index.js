document.addEventListener('DOMContentLoaded', function () {

    async function carregarPratos() {

        const pratosList = document.querySelector('.menu');

        try {
            const pratos = await fetch('/pratos/');
            const pratosJSON = await pratos.json();
            console.log(pratosJSON);
            pratosJSON.forEach(prato => {
                const pratoDiv = document.createElement('div');
                pratoDiv.classList.add('box');
                pratoDiv.innerHTML = `
                    <div class="menu-grid" id="todos">
                <div class="card card-car" id="principais">
                    <img src="${prato.foto}" class="produto" alt="Penne ao Pesto Cremoso">
                    <h3 class="card-name">${prato.nome}</h3>
                    <div class="dish-price card-car">
                        <h4>R$${prato.preco}</h4>
                    </div>
                    <button class="pedir-agora">Pedir agora</button>
                </div>
                `;	
                pratosList.appendChild(pratoDiv);
            });
        } catch (error) {
            console.error('Erro ao buscar pratos:', error);
        }
    }

    carregarPratos();
});