const mongoose = require('mongoose');
const User = require('../models/user');
const Application = require('../models/application');

beforeAll(async () => {
    await User.deleteMany({});
    await Application.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});
