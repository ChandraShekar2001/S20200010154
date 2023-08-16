const router = require('express').Router();
const {numbers} = require('../controllers/numberController'); 

router.route('/numbers').get(numbers);


module.exports = router;