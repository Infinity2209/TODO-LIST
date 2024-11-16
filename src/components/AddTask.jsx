import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const navigate = useNavigate();

    const handleAdd = async () => {
        if (title.trim() === "" || description.trim() === "" || dueDate === "") return;
    
        const newTask = {
            id: uuidv4(),
            title,
            description,
            dueDate,
            status: "todo",
        };
    
        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
    
            const addedTask = await response.json();
            console.log('Task added:', addedTask);
            navigate("/"); // Redirect to home after adding the task
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    

    return (
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
            <h1 className="font-bold text-center text-3xl">Add New Task</h1>
            <div className="addTodo my-5 flex flex-col gap-4">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    className="task rounded-full px-3 py-1 w-full"
                    placeholder="Enter task title"
                />
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows="3"
                    className="task rounded-full px-3 py-1 w-full h-[30vh]"
                    placeholder="Enter task description"
                />
                <input
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate}
                    type="date"
                    className="task rounded-full px-3 py-1"
                />
                <div className="button-container mt-[5%]">
                    <button
                        onClick={ () => handleAdd()}
                        disabled={title.length <= 3 || description.length <= 3 || !dueDate}
                        className="ml-2 bg-violet-800 text-white px-4 py-1 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
