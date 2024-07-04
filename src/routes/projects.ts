import express from 'express';
import db from '../services/db.service'

const router = express.Router();

// Read all projects
router.get('/',(req,res) => {
    const projects = db.query('SELECT * FROM projects');
    res.json(projects);
});

// Read single project
router.get('/:id', (req, res) => {
    const project = db.query('SELECT * FROM projects WHERE id = @id', { id: parseInt(req.params.id) })[0];
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  });

  // Create project
router.post('/', (req, res) => {
    let { id, name, description } = req.body;
    id = Math.trunc(id);
    const result = db.run('INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)', { id, name, description });
    console.log("result", result)
    res.status(201).json({ message: 'Project added successfully' });
  });


// Update project
router.put('/:id', (req, res) => {
    const { name, description } = req.body;
    const result = db.run('UPDATE projects SET name = @name, description = @description WHERE id = @id', 
      { id: req.params.id, name, description });
    if (result.changes > 0) {
      res.json({ message: 'Project updated successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  });
  
  // Delete project
router.delete('/:id', (req, res) => {
    const result = db.run('DELETE FROM projects WHERE id = @id', { id: req.params.id });
    if (result.changes > 0) {
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  });
  
export default router;

