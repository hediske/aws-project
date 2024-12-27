import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    Startdate: "",
    Enddate: "",
    banner: null,
  });

  // Fetch all tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks" ,error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setTaskForm({ ...taskForm, [name]: files[0] });
    } else {
      setTaskForm({ ...taskForm, [name]: value });
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(taskForm).forEach((key) => {
      formData.append(key, taskForm[key]);
    });

    try {
      console.log(taskForm);
      const response = await axios.post("http://localhost:4000/tasks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTasks([...tasks, response.data]);
      setTaskForm({
        title: "",
        description: "",
        Startdate: "",
        Enddate: "",
        banner: null,
      });
      toast.success("Task successfully added to the database")
    } catch (error) {
      toast.error("Error adding task" ,error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>

      <form onSubmit={handleAddTask} className="bg-white p-4 shadow-md rounded mb-6">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={taskForm.title}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={taskForm.description}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Start Date</label>
          <input
            type="date"
            name="Startdate"
            value={taskForm.Startdate}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">End Date</label>
          <input
            type="date"
            name="Enddate"
            value={taskForm.Enddate}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Banner</label>
          <input
            type="file"
            name="banner"
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      <div className="bg-white p-4 shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <div>
                  <h3 className="font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p>
                    <strong>Start:</strong> {task.Startdate} <br /> <strong>End:</strong>{" "}
                    {task.Enddate}
                  </p>
                  <img
                    src={task.bannerUrl ? task.bannerUrl : "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"}
                    alt={task.title}
                    className="w-24 h-24 object-cover mt-2"
                  />
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
