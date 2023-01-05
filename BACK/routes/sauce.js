const express = require ('express')
const router = express.Router()
const saucecontrols = require('../controllers/sauce')
const multer= require('../middleware/multer_config')
const auth = require('../middleware/auth')

router.get('/',auth.authToken,saucecontrols.getAllSauces)
router.get('/:id', auth.authToken, saucecontrols.getOneSauce);
router.post('/',auth.authToken,multer,saucecontrols.createSauce)
router.delete('/:id',auth.authToken,saucecontrols.deleteSauce)
router.put('/:id',auth.authToken,multer,saucecontrols.modifySauce)
router.post('/:id/like',auth.authToken,saucecontrols.like)
module.exports = router