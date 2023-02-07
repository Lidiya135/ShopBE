const express = require('express');
const router = express.Router();
const {usersController} = require('./../controller/users');
const {protect} = require("../middleware/auth");
const upload  = require("../middleware/upload");
// console.log(upload)
router.post("/register/:role",usersController.insert);
router.post("/login",usersController.login);
router.get("/profile", protect, usersController.getUser);
router.put("/:id",upload.single("photo"),usersController.update);

module.exports = router;