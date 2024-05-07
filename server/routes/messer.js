const express = require('express');
const router = express.Router();
const Messe = require('../models/Messer');
const multer = require('multer');
const path = require('path');

// Specify the storage location and filenames
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Use the 'uploads' directory for storage
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use the current timestamp and original filename
  }
});

// File filter to check and accept only images and videos
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|mp4|avi|mov/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and Videos Only!');
  }
};

// Initialize multer with the storage configuration and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100000000 } // for example, limit file size to 100MB
});


// Route to create training
router.post('/messeCreate', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const messeData = new Messe({
      ...req.body, // Assuming your Training model's schema matches the request body
    });

    const messe = await messeData.save();
    res.status(201).json({ message: 'Messe created successfully', messe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all training entries
router.get('/getAllMesser', async (req, res) => {
  try {
    const messeEntries = await Messe.find({});
    res.json(messeEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a single training entry by ID
router.get('/getMesse/:messeId', async (req, res) => {
  try {
    const messe = await Messe.findById(req.params.messeId);
    if (messe) {
      res.json(messe);
    } else {
      res.status(404).json({ error: 'Messe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a training entry
router.put('/updateMesse/:messeId', async (req, res) => {
  try {
    const updatedMesse = await Messe.findByIdAndUpdate(
      req.params.messeId,
      { ...req.body },
      { new: true } // Returns the updated document
    );
    if (updatedMesse) {
      res.json({ message: 'Messe updated successfully', updatedMesse });
    } else {
      res.status(404).json({ error: 'Messe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a training entry
router.delete('/deleteMesse/:messeId', async (req, res) => {
  try {
    const deletedMesse = await Messe.findByIdAndDelete(req.params.messeId);
    if (deletedMesse) {
      res.json({ message: 'Messe deleted successfully' });
    } else {
      res.status(404).json({ error: 'Messe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
