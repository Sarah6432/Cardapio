const db = require('../models/firebase.js'); 

class PratosRepository {

    constructor() {}
    async getPratos() {
        const pratos = await db.collection('pratos').get();
        return pratos.docs.map(doc => doc.data());
    }

    async getPrato(id) {
        const prato = await db.collection('pratos').doc(id).get();
        return prato.data();
    }

    async createPrato(prato) {
        console.log("Prato recebido para o banco:", prato);
        await db.collection('pratos').add(prato);
    }

    async updatePrato(id, prato) {
        await db.collection('pratos').doc(id).update(prato);
    }

    async deletePrato(id) {
        await db.collection('pratos').doc(id).delete();
    }
}

module.exports = PratosRepository;