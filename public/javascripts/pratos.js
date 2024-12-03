document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const nomeInput = document.getElementById('nome');
    const precoInput = document.getElementById('preco');
    const imagemInput = document.getElementById('imagem'); 

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = nomeInput.value;
        const preco = parseFloat(precoInput.value).toFixed(2);
        const imagem = imagemInput.files[0]; 

        
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('preco', preco);
        formData.append('imagem', imagem); 

        try {
            const response = await fetch('/pratos/criarPrato', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Prato criado com sucesso:', result);
                alert('Prato criado com sucesso!');
            } else {
                console.error('Erro ao criar prato:', response.statusText);
                alert('Erro ao criar prato. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao criar prato:', error);
            alert('Erro ao criar prato. Por favor, tente novamente.');
        }
    });

    async function exibirProtudos() {
        try {
            const response = await fetch('/pratos');
            const pratos = await response.json();
            console.log(pratos);
        } catch (error) {
            console.error('Erro ao buscar pratos:', error);
        }
    }

    exibirProtudos();
});
