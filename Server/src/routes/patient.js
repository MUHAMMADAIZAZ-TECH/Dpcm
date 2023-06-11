const express = require("express");
const router = express.Router();
const {
  patientSignUp,
  updatePatient,
  deletePatient,
  updatePatientPassword,
  patientLogin,
  getPatients,
} = require("../controllers/patient");

// Add a new patient
router.post("/add", patientSignUp);

router.get("/", getPatients);

// Update a patient's information
router.put("/update/:id", updatePatient);

// Delete a patient
router.delete("/:id", deletePatient);

// Update a patient's password
router.put("/updatepassword/:id", updatePatientPassword);

// Patient login (No authentication middleware applied)
router.post("/login", patientLogin);

module.exports = router;
