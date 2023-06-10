const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authMiddleware = require('../middleware/auth')

// Add admin
router.post('/addadmin', adminController.addAdmin);

// Remove admin
router.delete('/removeadmin/:id', adminController.removeAdmin);

// Update admin
router.put('/updateadmin/:id', adminController.updateAdmin);


router.get('/get', adminController.getAdmins);

//update adminpassword
router.put('/updateadminpassword/:id', adminController.updateAdminPassword)

//admin login
router.post('/loginadmin', adminController.adminLogin);

// Protected route that requires authentication
router.get('/dashboard', authMiddleware, (req, res) => {
    // Access the decoded admin data from req.admin
    const admin = req.admin;
    res.json({ message: 'Admin Dashboard', admin });
  });


module.exports = router;
