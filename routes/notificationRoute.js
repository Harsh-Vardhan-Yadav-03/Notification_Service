const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationController");

router
    .route("/notifications")
    .post(controller.sendNotification);
router
    .route("/users/:id/notifications")
    .get(controller.getUserNotification);

module.exports = router;