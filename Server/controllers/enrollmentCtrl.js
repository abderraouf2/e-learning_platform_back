const Course = require('../models/courseModel');
const Enrollment = require('../models/enrollmentModel');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/customError');



// Create an enrollment for a student in a course
const enrollInCourse = asyncHandler(async (req, res, next) => {
    try {
        const { _id } = req.body;

        // Find the course by its ID
        const course = await Course.findById(_id);
        if (!course) {
            return next(new CustomError('Course not found', 404));
        }

        // Create an enrollment for the student in the course
        const enrollment = await Enrollment.create({
            student: req.currentUser.id,
            course: course._id
        })


        res.status(200).json(enrollment);
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
});



// Get the list of courses enrolled by a student
const getEnrolledCourses = asyncHandler(async (req, res, next) => {
    try {

        // Find the enrolled courses for the student
        const enrolledCourses = await Enrollment.find({ student: req.currentUser.id, course: { $ne: null } }, { _id: 0, student: 0 }).populate('course');
        if (enrolledCourses.length === 0) {
            next(new CustomError('No enrolled courses found for the student', 404));
        }

        res.status(200).json(enrolledCourses);
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
});

module.exports = {
    enrollInCourse,
    getEnrolledCourses
};