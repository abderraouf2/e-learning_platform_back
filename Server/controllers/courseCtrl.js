const Course = require('../models/courseModel');
const CustomError = require('../utils/customError');
const asyncHandler = require('express-async-handler');

const createCourse = asyncHandler(async (req, res, next) => {
    const { courseName, description, instructor } = req.body;
    try {
        const newCourse = await Course.create({
            courseName,
            description,
            instructor,

        });
        res.status(200).json({ message: 'Course successfully created', data: newCourse });
    } catch (error) {
        next(new CustomError('Error while creating course', 500));
    }
});

const updateCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndUpdate(
            id,
            {
                courseName: req?.body?.courseName,
                description: req?.body?.description,
                instructor: req?.body?.instructor,
            },
            {
                new: true,
            }
        );

        if (!course) {
            return next(new CustomError(`Couldn't find course with the id of ${id}`, 404));
        }

        res.status(200).json({ message: 'Course updated successfully', data: course });
    } catch (error) {
        next(new CustomError('Error while updating course', 500));
    }
});

const searchByCourseName = asyncHandler(async (req, res, next) => {
    try {
        const { courseName } = req.body;

        if (!courseName) {
            return next(new CustomError('Course name is required.', 500));
        }

        const regex = new RegExp(courseName, 'i'); // 'i' flag for case-insensitive search

        const result = await Course.find({ courseName: regex });

        res.status(200).json({ success: true, result });
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
});

const getAllCourses = asyncHandler(async (req, res, next) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        next(new CustomError('Error while fetching courses', 500));
    }
});


const getCourse = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return next(new CustomError(`Couldn't find course with the id of ${id}`, 404));
        }

        res.status(200).json(course);
    } catch (error) {
        next(new CustomError('Error while fetching course', 500));
    }
});

const deleteCourse = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return next(new CustomError(`Couldn't find course with the id of ${id}`, 404));
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        next(new CustomError('Error while deleting course', 500));
    }
});

module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    getCourse,
    deleteCourse,
    searchByCourseName
};
