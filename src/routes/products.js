// ************ Require's ************
const express = require('express')
const router = express.Router()

// **** Configuro multer ****
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = path.join(
      __dirname,
      '../../public/images/products'
    )
    cb(null, destinationFolder)
  },
  filename: (req, file, cb) => {
    const newFileName = createImageName(file)
    cb(null, newFileName)
  },
})

function createImageName(file) {
  return 'img-' + Date.now() + '-' + file.originalname
}

const uploadFile = multer({
  storage,
  // limits: {
  //   fileSize: 5 * 1024 * 1024 // no larger than 5mb
  // }
})

// **** Configuro multer ****

// ************ Controller Require ************
const productsController = require('../controllers/productsController')

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index)

/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.create)
router.post('/', uploadFile.single('image'), productsController.store)

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail)

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit)
router.put('/edit/:id', productsController.update)

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy)

module.exports = router
