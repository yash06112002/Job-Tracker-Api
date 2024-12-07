const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else {
    require('dotenv').config();
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
