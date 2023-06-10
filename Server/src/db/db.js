const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://dbuser:dbuser123@cluster0.7kq9ndl.mongodb.net/MY CLINIC';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection established');
});


