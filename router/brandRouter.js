const brandRouter = require('express').Router()
const BrandController = require('../controller/BrandController')

brandRouter.get('/', BrandController.readAllBrand)
brandRouter.post('/', BrandController.addBrand)
brandRouter.put('/:brandId', BrandController.updateBrand)

module.exports = brandRouter