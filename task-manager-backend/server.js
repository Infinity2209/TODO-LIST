import express from 'express';
import { Low, JSONFile } from 'lowdb'; // Correct way for ESM
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*', // Allow all origins for now (you can specify a specific frontend URL later)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers you need
})); 
app.use(express.json());

// Create or connect to the database (tasks.json)
const db = new Low(new JSONFile('./tasks.json'));

// Initialize the database structure if the file is empty or hasn't been initialized yet
const initializeDB = async () => {
    console.log('Initializing database...');
    await db.read(); // Ensure that the data is read from the file

    // If there's no data or tasks array, initialize it
    if (!db.data) {
        db.data = { tasks: [] };
    }

    // Ensure the tasks array is initialized
    if (!Array.isArray(db.data.tasks)) {
        db.data.tasks = [];
    }

    await db.write(); // Write back the initialized data if it's newly created
    console.log('Database initialized or loaded.');
};

initializeDB(); // Initialize the DB on startup

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Add task endpoint
app.post('/api/tasks', async (req, res) => {
    const task = req.body;

    if (!task || !task.title || !task.description || !task.dueDate) {
        return res.status(400).send({ error: "Invalid task data" });
    }

    try {
        db.data.tasks.push(task);
        await db.write();
        res.status(201).send(task);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).send({ error: 'Failed to add task' });
    }
});


// Get all tasks endpoint
app.get('/api/tasks', async (req, res) => {
    console.log('Fetching tasks...'); // Log to verify the endpoint is hit
    await db.read();
    console.log('Fetched tasks:', db.data.tasks); // Log the tasks
    res.status(200).json(db.data.tasks);
});

// Delete a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the task with the given ID exists
    const taskIndex = db.data.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).send({ error: 'Task not found' });
    }

    // Remove the task from the array
    db.data.tasks.splice(taskIndex, 1);

    // Write the changes to the database
    await db.write();

    res.status(200).send({ message: 'Task deleted successfully' });
});

// Update a task by ID
app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;

    // Check if the task with the given ID exists
    const taskIndex = db.data.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).send({ error: 'Task not found' });
    }

    // Update the task in the array
    db.data.tasks[taskIndex] = { ...db.data.tasks[taskIndex], ...updatedTask };

    // Write the changes to the database
    await db.write();

    res.status(200).send(db.data.tasks[taskIndex]); // Send the updated task back
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
