import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

const EditTask = () => {
    const navigate = useNavigate();
    const { state } = useLocation(); // Access task data passed from Home
    const { task } = state || {}; // Destructure task data

    const [editingTaskId, setEditingTaskId] = useState(task?.id || null);
    const [editTitle, setEditTitle] = useState(task?.title || "");
    const [editDescription, setEditDescription] = useState(task?.description || "");
    const [editDueDate, setEditDueDate] = useState(task?.dueDate || "");

    // Handle save changes
    const handleSaveEdit = async () => {
        const updatedTask = {
            id: editingTaskId,
            title: editTitle,
            description: editDescription,
            dueDate: editDueDate,
            status: 'todo', // Or adjust based on your app's logic
        };

        try {
            // Send PUT request to update the task on the backend
            const response = await axios.put(`${BASE_URL}/api/tasks/${editingTaskId}`, updatedTask);

            // Update localStorage after the backend update
            const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
            const updatedTodos = storedTodos.map((item) =>
                item.id === editingTaskId
                    ? { ...item, title: editTitle, description: editDescription, dueDate: editDueDate }
                    : item
            );
            localStorage.setItem("todos", JSON.stringify(updatedTodos));

            // Reset the editing task ID and navigate to the home page
            setEditingTaskId(null);
            navigate("/"); // Redirect to the home page after saving

            console.log("Task updated successfully:", response.data);

        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%] mt-[5%]">
            <h1 className="font-bold text-center text-3xl">Edit Task</h1>
            <div className="flex-container mt-[10%] mx-[10%]">
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="task rounded-full px-3 py-1 w-full"
                />
                <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="task rounded-full px-3 py-1 w-full h-[30vh]"
                />
                <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="task rounded-full px-3 py-1"
                />
                <div className="button-container mt-[5%]">
                    <button onClick={handleSaveEdit} className="ml-2 bg-violet-800 text-white px-4 py-1 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTask;
