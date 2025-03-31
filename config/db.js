const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB підключено');
    } catch (err) {
        console.error('❌ MongoDB помилка підключення:', err);
    }
};

module.exports = connectDB;
