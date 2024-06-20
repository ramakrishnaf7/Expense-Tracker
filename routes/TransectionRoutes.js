const express = require('express')
const { addTransection, getAllTransection,editTransection,deleteTransection } = require('../controllers/transectionCtrl')

const router = express.Router()

//routers
//add transection POST

router.post('/add-transection',addTransection)

//edit transection POST

router.post('/edit-transection',editTransection)

//delete transection

router.post('/delete-transection',deleteTransection)

//get transections 
router.post('/get-transection',getAllTransection)


module.exports = router;