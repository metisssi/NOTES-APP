const express = require('express')
const router = express.Router();
const { isLoggedIn }  = require('../middleware/checkAuth')
const dashboardController = require('../controllers/dashboardController')

/**
 * Dashboards Routes
 */

router.get('/', isLoggedIn, dashboardController.dashboardControllerGet);
router.get('/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
router.put('/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);
router.delete('/item/:id', isLoggedIn, dashboardController.dashboardDeleteNote);
router.get('/add', isLoggedIn, dashboardController.dashboardAddNotes);
router.post('/add', isLoggedIn, dashboardController.dashboardAddNotesSubmit);
router.get('/add/search', isLoggedIn, dashboardController.dashboardSearch);
router.post('/add/search', isLoggedIn, dashboardController.dashboardSearchSubmit);

module.exports = router





 

