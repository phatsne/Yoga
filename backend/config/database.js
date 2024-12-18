const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error("MONGO_URI is not defined in the environment variables");
        process.exit(1);
    }

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch(error => {
            console.log('Error while connecting server with Database');
            console.log(error);
            process.exit(1);
        });
};
