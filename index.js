require('dotenv').config();
const express = require('express'); // Import Express
const cookieParser = require('cookie-parser'); // For parsing cookies
const cors = require('cors'); // For handling CORS requests
const helmet = require('helmet'); // For basic security headers
const morgan = require('morgan'); // For request logging
const mongoose = require('mongoose'); // MongoDB connection
const path = require('path');
const carRoutes = require('./routes/carRoutes');
const clientRoutes = require('./routes/userRoute');
const cartRoutes = require('./routes/cartRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express(); // Create the Express app
const PORT = 5000; // Hardcoded port

// Hardcoded MongoDB connection URL
const MONGO_URL = "mongodb://localhost:27017/CarRentals";

// MongoDB connection
const connectDB = async () => {
    console.log('Starting MongoDB connection process...');
    console.log('MongoDB URL:', MONGO_URL);

    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(MONGO_URL, {
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

// Connect to the database
connectDB();

// Middleware
app.use(cors({
    origin: '*', // Or specify the exact origin that can access your resources
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies
app.use(helmet()); // Add security headers
app.use(morgan('dev')); // Log requests during development

// Define routes
app.use('/api/user', clientRoutes); // Client-related endpoints
app.use('/api/cars', carRoutes); // Car-related endpoints
app.use('/api/cart', cartRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/uploads', cors(), express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    }
}));
// 404 Not Found
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the stack trace
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await mongoose.connection.close();
    process.exit(0);
});

app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(middleware.route.path); // Logs all registered routes
    }
});
