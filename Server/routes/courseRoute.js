const express = require('express');
const router = express.Router();
const {
    createCourse,
    getAllCourses,
    updateCourse,
    getCourse,
    deleteCourse,
    searchByCourseName,
    getCoursesByCategory,
    getRecommendedCourses

} = require('../controllers/courseCtrl');
const { validateToken, isAdmin } = require('../middlewares/validateToken');


router.post("/addCourse", createCourse);
router.put("/updateCourse/:id", validateToken, updateCourse);
router.delete("/deleteCourse/:id",  deleteCourse);
router.get("/all-courses", getAllCourses);

router.post('/search_course', searchByCourseName);

router.get("/getCourse/:id", getCourse);
router.post("/coursesByCategory", getCoursesByCategory);
router.get('/recommended-courses', getRecommendedCourses);





module.exports = router;
