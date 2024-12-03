const PratosRepository = require('../repository/pratosRepository.js');
const pratosRepository = new PratosRepository();

exports.getPratos = async (req, res) => {
   try{
        const pratos = await pratosRepository.getPratos();
        res.status(200).json(pratos);
   }catch (error){
        console.log(error);
        res.status(500).json({error: error.message});
   }
}

exports.createPrato = async (req, res) => {
    try{
        const prato = req.body;
        console.log("Prato recebido:", prato);
        const newPrato = await pratosRepository.createPrato(prato);
        console.log("Prato criado com sucesso:", newPrato);
        res.status(201).json({ message: "Prato criado com sucesso", prato: newPrato });
    }catch (error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
}