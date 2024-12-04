const { MongoClient } = require('mongodb');

class PratosRepository {
  constructor() {
    const uri = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurante?retryWrites=true&w=majority';
    this.client = new MongoClient(uri);
    this.dbName = 'restaurante';
  }

  async getPratos() {
    await this.client.connect();
    const database = this.client.db(this.dbName);
    const pratos = database.collection('pratos');
    return pratos.find().toArray();
  }

  async createPrato(prato) {
    await this.client.connect();
    const database = this.client.db(this.dbName);
    const pratos = database.collection('pratos');
    const result = await pratos.insertOne(prato);
    return result.ops[0];
  }
}

module.exports = PratosRepository;
