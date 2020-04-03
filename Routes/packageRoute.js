const express = require('express')
const router = express.Router()
const packageController = require('../controllers/packageController')
const { check } = require('express-validator')

    // route   POST api/package/
    // Desc    Create new package
    // @access private/authentcation required
router.post('/',  [
    check('type', 'Tye is required').not().isEmpty(),
    check('genders', 'Gender field is required').not().isEmpty(),
    check('no_of_beds', 'please enter the no of beds').not().isEmpty(),
    check('cost', 'cost field is required').not().isEmpty(),
    ], packageController.createPackage)

    // route   GET api/package/
    // Desc    Get all available package
    // @access private/authentcation required
router.get('/', packageController.getAllPackage)

    // route    PUT api/package/:id
    // Desc    Update package
    // @access private/authentcation required
router.put('/:id',  [
    check('type', 'Tye is required').not().isEmpty(),
    check('genders', 'Gender field is required').not().isEmpty(),
    check('no_of_beds', 'please enter the no of beds').not().isEmpty(),
    check('cost', 'cost field is required').not().isEmpty(),
    ], packageController.updatePackage)

    // route    DELETE api/package/:id
    // Desc    DELETE package
    // @access private/authentcation required
router.delete('/:id', packageController.deletePackage)

module.exports = router