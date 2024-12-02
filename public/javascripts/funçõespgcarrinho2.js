// Função para adicionar pratos ao carrinho
document.querySelectorAll('.pedir-agora').forEach((button) => {
    button.addEventListener('click', function () {
        const dishElement = this.closest('.card'); // Localiza o card correspondente
        const dish = {
            title: dishElement.querySelector('.card-name').textContent.trim(),
            description: dishElement.querySelector('p').textContent.trim(),
            price: dishElement.querySelector('.dish-price h4').textContent.trim(),
            image: dishElement.querySelector('.produto').src,
        };

        // Recupera o carrinho existente ou inicializa como array vazio
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(dish);

        // Salva o carrinho atualizado no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

// Função para exibir o carrinho ao carregar a página
window.onload = function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio!</p>';
        return;
    }

    cart.forEach((dish, index) => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${dish.image}" alt="${dish.title}" height="100px">
            </div>
            <div class="cart-item-details">
                <h3>${dish.title}</h3>
                <p>${dish.description}</p>
                <p><strong>${dish.price}</strong></p>
                <button class="remove-btn" data-index="${index}">Remover</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Atualiza os preços
    updateSummary();

    // Adiciona funcionalidade ao botão de remoção
    document.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload(); // Recarrega para atualizar o carrinho
        });
    });
};

// Função para calcular o preço total e o subtotal
function updateSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    // Calcula o subtotal com base nos itens no carrinho
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('R$', '').replace(',', '.'));
        subtotal += price;
    });

    const deliveryFee = calculateDelivery(); // Calcula a entrega, se necessário
    const total = subtotal + deliveryFee;

    // Atualiza os valores na interface
    document.getElementById('sub-total-preco').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (deliveryFee > 0) {
        document.getElementById('valor-entrega').textContent = `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
    } else {
        document.getElementById('valor-entrega').textContent = 'R$ 0,00'; // Sem entrega se não houver valor
    }
    document.getElementById('total-preco').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Função para calcular a taxa de entrega com base no CEP
function calculateDelivery() {
    const cep = document.getElementById('cep').value;

    // Verifica se o campo CEP está preenchido
    if (cep.trim() !== "") {
        // Simulação: se o CEP não for local (definido como '00000-000'), será cobrada uma taxa de entrega
        if (cep !== '00000-000') {
            return 10.00; // Exemplo: taxa fixa de entrega
        }
    }
    return 0.00; // Se o CEP não for válido ou não for inserido, a entrega é grátis
}

// Função para atualizar o CEP e a entrega
function buscarEndereco() {
    const cep = document.getElementById('cep').value;
    const enderecoContainer = document.getElementById('endereco');

    // Verifica se o CEP foi inserido
    if (cep.trim() !== "") {
        // Aqui você poderia fazer uma API real para buscar o endereço, mas para fins de exemplo:
        if (cep === '00000-000') {
            enderecoContainer.textContent = 'Entrega no próprio restaurante, sem custo de entrega.';
        } else {
            enderecoContainer.textContent = 'Entrega externa, custo de R$ 10,00.';
        }

        updateSummary(); // Atualiza o subtotal e total quando o CEP for inserido
    } else {
        enderecoContainer.textContent = ''; // Se o campo CEP estiver vazio, não exibe a mensagem
        updateSummary(); // Atualiza o subtotal e total sem a entrega
    }
}
