const mongoose = require('mongoose');

const mongoConnection = () => {
  return mongoose.connect(process.env.MONGODB_URL, {
   useNewUrlParser: true, 
   useUnifiedTopology: true       
  });
};

module.exports = mongoConnection;  

// MONGODB_URL=mongodb+srv://jishnu:iV1nYHf77FYnp8Ju@cluster0.zppmaeb.mongodb.net/Doctor_appointment?retryWrites=true&w=majority