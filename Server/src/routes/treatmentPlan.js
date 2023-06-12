const express = require("express");
const router = express.Router();
const treatmentPlanController = require("../controllers/treatmentPlan");

// Define routes
router.post("/", treatmentPlanController.createTreatmentPlan);
// router.post('/', treatmentPlanController.addPrice);

module.exports = router;
