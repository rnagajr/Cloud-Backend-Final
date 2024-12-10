const mongoose = require('mongoose');

const connectDB = async () => {
    console.log('Starting MongoDB connection process...');
    console.log('MongoDB URL:', process.env.MONGO_URL); // Check the loaded URL

    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.error('Full error details:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
