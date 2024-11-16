import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Fetch all tasks
export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/tasks`);
        console.log('Fetched tasks:', response.data); // Log the response
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};


// Add a new task
export const addTask = async (task) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/tasks`, task);
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

// Update a task
export const updateTask = async (id, updatedTask) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/tasks/${id}`, updatedTask);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

// Delete a task
export const deleteTask = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/api/tasks/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};
