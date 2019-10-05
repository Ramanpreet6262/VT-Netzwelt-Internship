const express = require("express");

const verifyController = require("../controllers/verify");

const validationController = require("../controllers/validation_controller");

const languageController = require("../controllers/languageController");

const router = express.Router();

router.get("/validate", validationController.getCheck);
router.post("/validate", validationController.postCheck);
router.post("/login", validationController.postLogin);
router.get("/getdata", verifyController.verify, validationController.getData);
router.get("/en", languageController.en);
router.get("/de", languageController.de);

module.exports = router;
