const express = require('express');
const router = express.Router();

const productRoutes = require('./products_routes');
const ProductCertifications = require('./ProductCertifications_routes');
const ManufactureLocation = require('./ManufactureLocation_routes');
const MainCategoryRoutes = require('./MainCategory_routes');
const SupplierCertifcations = require('./SupplierCertifications_route');

router.use('/products', productRoutes);
router.use('/MainCategory', MainCategoryRoutes);
router.use('/ProductCertifications', ProductCertifications);
router.use('/SupplierCertifications', SupplierCertifcations);
router.use('/ManufactureLocation', ManufactureLocation);

module.exports = router;
