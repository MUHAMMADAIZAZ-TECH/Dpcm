const Patient = require('../models/patient');
const jwt = require('jsonwebtoken');

exports.addPatient = async (req, res) => {
  try {
    const { name, email, password, contact, address, age, gender, city } = req.body;
    const patientExists = await Patient.findOne({ email });

    if (patientExists) {
      return res.status(400).json({ error: 'Patient with this email already exists' });
    }

    const patient = await Patient.create({ name, email, password, contact, address, age, gender });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};



exports.getPatients = async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, contact, address, age, gender, city } = req.body;

    // Check if email already exists in the database
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient && existingPatient._id.toString() !== id) {
      return res.status(400).json({ error: 'This email is already taken' });
    }

    const patient = await Patient.findByIdAndUpdate(id, { name, email, password, contact, address, age, gender, city }, { new: true });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updatePatientPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    if (patient.password !== oldPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    patient.password = newPassword;
    await patient.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};





exports.patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient || patient.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: patient._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
  
  