const express = require("express");
const defaultController = require("../controller/defaultController");


const router = express.Router();


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default';
    next()
})
router.route('/').get(defaultController.index);
router.route('/login').get(defaultController.login).post(defaultController.loginPost);
router.route('/register').get(defaultController.registerGet).post(defaultController.registerPost);

module.exports = router;
