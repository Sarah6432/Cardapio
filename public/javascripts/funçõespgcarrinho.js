document.querySelectorAll('.cart').forEach((button) => {
    button.addEventListener('click', function () {
        const dishElement = this.closest('.dish'); 
        const dish = {
            title: dishElement.querySelector('.dish-title').textContent,
            description: dishElement.querySelector('.dish-description').textContent,
            price: dishElement.querySelector('.dish-price h4').textContent,
            image: dishElement.querySelector('.dish-image').src,
        };

        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(dish);

       
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});
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

    document.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload(); 
        });
    });
};

function updateSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('R$', '').replace(',', '.'));
        subtotal += price;
    });

    const deliveryFee = calculateDelivery(); 
    const total = subtotal + deliveryFee;

    
    document.getElementById('sub-total-preco').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (deliveryFee > 0) {
        document.getElementById('valor-entrega').textContent = `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
    } else {
        document.getElementById('valor-entrega').textContent = 'R$ 0,00'; 
    }
    document.getElementById('total-preco').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}
function calculateDelivery() {
    const cep = document.getElementById('cep').value;

    
    if (cep.trim() !== "") {
       
        if (cep !== '00000-000') {
            return 10.00; 
        }
    }
    return 0.00; 
}


function buscarEndereco() {
    const cep = document.getElementById('cep').value;
    const enderecoContainer = document.getElementById('endereco');

    
    if (cep.trim() !== "") {
        
        if (cep === '00000-000') {
            enderecoContainer.textContent = 'Entrega no próprio restaurante, sem custo de entrega.';
        } else {
            enderecoContainer.textContent = 'Entrega externa, custo de R$ 10,00.';
        }

        updateSummary(); 
    } else {
        enderecoContainer.textContent = ''; 
        updateSummary(); 
    }
}


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


    updateSummary();

   
    document.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload(); 
        });
    });
};
