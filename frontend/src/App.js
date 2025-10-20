import React from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskList from "./components/Tasks/TaskList";

function App() {
  return (
    <div>
      <h1>Task Management App</h1>
      <Login />
      {/* <Register /> */}
      {/* <TaskList /> */}
    </div>
  );
}

export default App;
