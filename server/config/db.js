const mongoose = require('mongoose');

const DEFAULT_URI = 'mongodb://127.0.0.1:27017/atelier';

const isValidMongoUri = (u) => /^mongodb(\+srv)?:\/\//i.test(u);

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI ? String(process.env.MONGO_URI).trim() : '';

    if (!uri) {
      uri = DEFAULT_URI;
    } else if (!isValidMongoUri(uri)) {
      console.warn('La variable MONGO_URI est invalide ou mal formée. Utilisation de la valeur par défaut. Vérifiez votre .env');
      uri = DEFAULT_URI;
    }

    // Avoid logging sensitive credentials. Show only host/path part.
    const shortUri = uri.replace(/^(mongodb(\+srv)?:\/\/)(.*@)?/, '$1');

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to', shortUri);
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    // rethrow and let the caller decide what to do (server can avoid starting)
    throw err;
  }
};

module.exports = connectDB;
