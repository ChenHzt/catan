const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://dbUser:DOzxrz1okkEcQK8m@cluster0.ykvbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    // The MongoDB Node.js driver rewrote the tool it uses to parse MongoDB connection strings. Because this is such a big change, they put the new connection string parser behind a flag
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
