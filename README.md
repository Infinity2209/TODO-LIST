Todo List Application
This project is a full-stack Todo List application with a backend and frontend. The backend is responsible for managing the tasks, and the frontend allows users to interact with the tasks.

Project Structure
todo-list/ - The frontend folder that contains the Todo List React app.
task-manager-backend/ - The backend folder that contains the Node.js server responsible for managing tasks.
Prerequisites
Before starting the project, make sure you have the following installed:

Node.js (Recommended version: 14.x or later)
npm (Node package manager, comes with Node.js)
Setup Instructions
1. Clone the Repository
Clone the repository to your local machine:

bash
Copy code
git clone (https://github.com/Infinity2209/TODO-LIST.git)
cd TODO-LIST
1. Set Up the Frontend
Navigate to the todo-list folder:

bash
Copy code
cd todo-list
Install the required dependencies for the frontend:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm run dev
This will start the React app on http://localhost:3000 by default.

3. Set Up the Backend
Navigate to the task-manager-backend folder:

bash
Copy code
cd task-manager-backend
Install the required dependencies for the backend:

bash
Copy code
npm install
Start the backend server:

bash
Copy code
node server.js
This will start the backend server on http://localhost:5000 by default.

4. Accessing the Application
Once both servers are running, you can access the Todo List application at:

Frontend (React app): http://localhost:3000
Backend (API server): http://localhost:5000
5. Additional Notes
The frontend (React) app communicates with the backend (Node.js) to manage tasks.
The backend API is built with Express.js and runs on http://localhost:5000.
Make sure both the frontend and backend servers are running simultaneously for the application to work correctly.
Troubleshooting
If you encounter issues starting the frontend or backend, ensure that the required dependencies are installed by running npm install in both the todo-list and task-manager-backend directories.
If you get errors related to the server not starting, check if port 5000 is available or if another service is using the port.