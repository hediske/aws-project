import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addTask, getAllTasks, findTaskById, deleteAllTasks, deleteTaskById } from './TaskService.js';
import uploadS3 from './s3Upload.js';
import { connectDB } from './DBconfig.js';


const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


connectDB()


// ROUTES FOR OUR API
// =======================================================

//Health Checking
app.get('/health',(req,res)=>{
    res.json("This is the health check");
});

// Add Task with S3 upload
app.post('/tasks', uploadS3.single('banner'), async (req, res) => {
  try {
    console.log(req.body)
    const { title, description, Startdate, Enddate } = req.body;
    const bannerUrl = req.file ? req.file.location : null;
    console.log({ title, description, Startdate, Enddate, bannerUrl })
    const task = await addTask({ title, description, Startdate, Enddate, bannerUrl });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await findTaskById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete All Tasks
app.delete('/tasks', async (req, res) => {
  try {
    const rowsDeleted = await deleteAllTasks();
    res.json({ message: `${rowsDeleted} tasks deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const rowsDeleted = await deleteTaskById(req.params.id);
    if (rowsDeleted) {
      res.json({ message: `Task with ID ${req.params.id} deleted` });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  app.listen(port, () => {
    console.log(`AB3 backend app listening at http://localhost:${port}`)
  })