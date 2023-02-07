const express = require("express");
const router = express.Router();
const { transactionController } = require("../controller/transactions");
const { protect } = require("../middleware/auth");

router.get("/", protect, transactionController.getTransByUser);
router.get("/:id", protect, transactionController.getTransDetail);
router.post("/", protect, transactionController.insertTrans);

module.exports = router;