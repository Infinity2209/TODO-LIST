import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
