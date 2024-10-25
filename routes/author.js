const express = require('express');
// get using express router
const router = express.Router();
//define article controller and export it for file
const authorController = require('../controllers/author')

//use controller functions according to the route
router.get('/:author_id', authorController.getAuthorArticles);

// export article router for using in deafult application file
module.exports = router;