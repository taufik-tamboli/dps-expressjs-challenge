import express from 'express';
import db from '../services/db.service'

const router = express.Router();

// Read all reports
router.get('/', (req, res) => {
    const reports = db.query('SELECT * FROM reports');
    res.json(reports);
  });
  
  // Read single report
  router.get('/:id', (req, res) => {
    const report = db.query('SELECT * FROM reports WHERE id = @id', { id: req.params.id })[0];
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ error: 'Report not found' });
    }
  });

// Create report
router.post('/', (req, res) => {
    const { id, text, projectid } = req.body;
    const result = db.run('INSERT INTO reports (id, text, projectid) VALUES (@id, @text, @projectid)', { id, text, projectid });
    res.status(201).json({ message: 'Report added successfully' });
  });


// Update report
router.put('/:id', (req, res) => {
    const { text, projectid } = req.body;
    const result = db.run('UPDATE reports SET text = @text, projectid = @projectid WHERE id = @id', 
      { id: req.params.id, text, projectid });
    if (result.changes > 0) {
      res.json({ message: 'Report updated successfully' });
    } else {
      res.status(404).json({ error: 'Report not found' });
    }
  });

// Delete report
router.delete('/:id', (req, res) => {
    const result = db.run('DELETE FROM reports WHERE id = @id', { id: req.params.id });
    if (result.changes > 0) {
      res.json({ message: 'Report deleted successfully' });
    } else {
      res.status(404).json({ error: 'Report not found' });
    }
  });

export default router;

