const PratosRepository = require('../repository/pratosRepository');
const pratosRepository = new PratosRepository();
const fs = require('fs');
const path = require('path');

exports.getPratos = async (req, res) => {
  try {
    const pratos = await pratosRepository.getPratos();
    res.status(200).json(pratos);
  } catch (error) {
    console.error('Erro ao buscar pratos:', error);
    res.status(500).json({ error: 'Erro ao buscar pratos' });
  }
};

exports.createPrato = async (req, res) => {
  try {
    const { nome, preco, descricao, imagem } = req.body;

    if (!nome || !preco || !descricao || !imagem) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const buffer = Buffer.from(imagem, 'base64'); 
    const imagePath = path.join(__dirname, '../public/images', `${nome.replace(/ /g, '_')}.jpg`);
    
    fs.writeFileSync(imagePath, buffer); 

    const prato = {
      nome,
      preco,
      descricao,
      imagem: `/images/${nome.replace(/ /g, '_')}.jpg`,
    };

    const newPrato = await pratosRepository.createPrato(prato);
    res.status(201).json({ message: 'Prato criado com sucesso!', prato: newPrato });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
