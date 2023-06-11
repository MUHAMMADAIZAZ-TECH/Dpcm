const express = require("express");
const router = express.Router();
const {
  addFinanceEntry,
  getAllFinanceEntries,
} = require("../controllers/financeController");

// Add a new patient
router.post("/addEntry", addFinanceEntry);

router.get("/", getAllFinanceEntries);

// Update a patient's information
// router.put("/update/:id", updatePatient);

// // Delete a patient
// router.delete("/:id", deletePatient);

// // Update a patient's password
// router.put("/updatepassword/:id", updatePatientPassword);

// // Patient login (No authentication middleware applied)
// router.post("/login", patientLogin);

module.exports = router;
