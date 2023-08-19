const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
