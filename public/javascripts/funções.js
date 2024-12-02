document.querySelectorAll('.pedir-agora').forEach(button => {
    button.addEventListener('click', (event) => {
       
        const card = event.target.closest('.card');
        const pratoNome = card.querySelector('h3').innerText;
        const pratoImagem = card.querySelector('img').src;

        
        const notification = document.getElementById('notification');
        notification.innerText = `Você adicionou "${pratoNome}" ao carrinho!`;
        notification.classList.remove('hidden');
        notification.classList.add('show');

       
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push({ nome: pratoNome, imagem: pratoImagem });
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

       
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.classList.add('hidden'), 400);
        }, 2000);

    });
});
