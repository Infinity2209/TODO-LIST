import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { fetchTasks, updateTask, deleteTask } from '../api';

const Home = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [todos, setTodos] = useState([]);
    const [showStage, setShowStage] = useState("all");

    // Load tasks from localStorage
    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await fetchTasks();
            setTodos(tasks);
        };
        loadTasks();
    }, []);

    const handleStatusChange = async (e, id) => {
        const newStatus = e.target.value;
        const updatedTodos = todos.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
        );
        setTodos(updatedTodos);
        await updateTask(id, { status: newStatus });
    };

    const handleDelete = async (e, id) => {
        setTodos(todos.filter((item) => item.id !== id));
        await deleteTask(id);
    };

    const handleEdit = (task) => {
        navigate('/edit', { state: { task } });
    };


    // const handleSaveEdit = (id) => {
    //     const updatedTodos = todos.map((item) =>
    //         item.id === id
    //             ? { ...item, title: editTitle, description: editDescription, dueDate: editDueDate }
    //             : item
    //     );
    //     setTodos(updatedTodos);
    //     localStorage.setItem("todos", JSON.stringify(updatedTodos));
    //     setEditingTaskId(null); // Stop editing
    // };

    return (
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
            <h1 className="font-bold text-center text-3xl">myTask</h1>
            <div className="my-6">
                <label htmlFor="filter" className="mr-2">Filter by Stage:</label>
                <select
                    id="filter"
                    className="rounded-full px-3 py-1"
                    onChange={(e) => setShowStage(e.target.value)}
                    value={showStage}
                >
                    <option value="all">All</option>
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-4"></div>
            <h2 className="text-2xl font-bold">Your Todos</h2>
            <div className="todos my-5">
                {todos.filter((item) => showStage === "all" || item.status === showStage).length === 0 && (
                    <div className="m-8">No Todos to display</div>
                )}
                {todos
                    .filter((item) => showStage === "all" || item.status === showStage)
                    .map((item) => (
                        <div key={item.id} className="todo flex my-8 justify-between">
                            <div className="flex gap-5">
                                <select
                                    value={item.status}
                                    onChange={(e) => handleStatusChange(e, item.id)}
                                    className="rounded-full px-3 py-1"
                                >
                                    <option value="todo">To Do</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>Due: {item.dueDate}</p>
                                </div>
                            </div>
                            <div className="buttons flex h-full">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={(e) => handleDelete(e, item.id)}
                                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                {/* Link to add a new task */}
                <div className="text-center mt-5 ">
                    <Link to="/add" className="absolute bottom-12 bg-violet-800 text-white rounded-full py-2 px-4">Add Task</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
