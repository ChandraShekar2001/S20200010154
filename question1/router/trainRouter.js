const router = require('express').Router();
const {getTrainInfo} = require('../controllers/trainController'); 

router.route('/trains').get(getTrainInfo);


module.exports = router;