import express, { Express } from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects';
import reportRoutes from './routes/reports';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Optional: authentication middleware

const authMiddleware = (req:any, res:any, next:any) => {
	const authToken = req.headers['authorization'];
	if (authToken !== 'Password123') {
	  return res.status(401).json({ error: 'Unauthorized' });
	}
	next();
  };

app.use('/projects', authMiddleware, projectRoutes);
app.use('/reports', authMiddleware, reportRoutes);



app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
