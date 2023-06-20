const mongoose = require('mongoose');

const mongoConnection = () => {
  return mongoose.connect(process.env.MONGODB_URL, {
   useNewUrlParser: true, 
   useUnifiedTopology: true
  });
};

module.exports = mongoConnection; 