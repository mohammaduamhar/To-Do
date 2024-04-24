import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Textarea, Alert, Dropdown, DropdownItem } from 'flowbite-react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToggleSwitch } from "flowbite-react";

export default function TaskList() {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editTaskId, setEditTaskId] = useState('');
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState('all'); // Default filter is 'All'
  const [selectedTask, setSelectedTask] = useState(null); // State to hold selected task details
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks/mytasks');
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  function onCloseModal() {
    setOpenModal(false);
    setTitle('');
    setDescription('');
    setDueDate('');
    setCompleted(false);
    setError('');
    setEditTaskId('');
    setUpdate(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    const currentDate = new Date();
    const selectedDate = new Date(dueDate);
    if (selectedDate < currentDate) {
      setError('Due date cannot be in the past.');
      return;
    }

    if (!update) {
      axios.post('/api/tasks/add', {
        title,
        description,
        dueDate,
        completed,
      })
        .then((response) => {
          console.log('Task added successfully:', response.data);
          onCloseModal();
          getTasks();
        })
        .catch((error) => {
          setError('Error adding task. Please try again later.');
          console.error('Error adding task:', error);
        });
    } else {
      axios.put(`/api/tasks/update/${editTaskId}`, {
        title,
        description,
        dueDate,
        completed,
      })
        .then((response) => {
          console.log('Task updated successfully:', response.data);
          onCloseModal();
          getTasks();
        })
        .catch((error) => {
          setError('Error updating task. Please try again later.');
          console.error('Error updating task:', error);
        })
        .finally(() => {
          setUpdate(false); // Reset update state
        });
    }
  }

  const markTaskAsDone = async (taskId, completed) => {
    try {
      await axios.put(`/api/tasks/update/${taskId}`, { completed: !completed });
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/delete/${taskId}`);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (taskId) => {
    setOpenModal(true);
    // Find the task to edit from taskList
    const taskToEdit = taskList.find(task => task._id === taskId);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setCompleted(taskToEdit.completed);
      setEditTaskId(taskId);
      setUpdate(true);
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredTasks = taskList.filter(task => {
    if (filter === 'all') {
      return true; // Show all tasks
    } else if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'pending') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className='max-w-2xl mx-auto px-4'>
      <div className="flex items-center justify-between">
        <Button gradientDuoTone='purpleToPink' onClick={() => setOpenModal(true)}>Add Task</Button>
        <Dropdown gradientDuoTone='purpleToPink' label="Filter Tasks:">
          <DropdownItem onClick={() => setFilter('all')}>All</DropdownItem>
          <DropdownItem onClick={() => setFilter('completed')}>Completed</DropdownItem>
          <DropdownItem onClick={() => setFilter('pending')}>Pending</DropdownItem>
        </Dropdown>
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup className="w-full">
        <Modal.Header />
        <Modal.Body>
          {error && <Alert type="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add New Task</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  placeholder="Task title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <Textarea
                  id="description"
                  placeholder="Task description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="dueDate" value="Due Date" />
                </div>
                <TextInput
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(event) => {
                    setDueDate(event.target.value);
                    setError('');
                  }}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <input
                    id="completed"
                    type="checkbox"
                    checked={completed}
                    onChange={(event) => setCompleted(event.target.checked)}
                  />
                  <Label htmlFor="completed">Completed</Label>
                </div>
              </div>
              <div className="w-full">
                <Button type="submit">Add Task</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal for displaying task details */}
      <Modal show={selectedTask !== null} size="md" onClose={() => setSelectedTask(null)} popup className="w-full">
        <Modal.Header>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Task Details</h3>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <>
              <h4 className="font-semibold">Title:</h4>
              <p>{selectedTask.title}</p>
              <h4 className="font-semibold">Description:</h4>
              <p>{selectedTask.description}</p>
              <h4 className="font-semibold">Due Date:</h4>
              <p>{formatDueDate(selectedTask.dueDate)}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setSelectedTask(null)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4 w-full">
        {filteredTasks.map((task) => (
          <div key={task._id} className="rounded-lg p-4 mb-4 shadow-2xl gap-4">
            <div className="flex items-center justify-between">
            <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => markTaskAsDone(task._id, task.completed)}
                />
              <div className="w-96 flex justify-between" onClick={() => setSelectedTask(task)}>
                <span className={`${task.completed ? 'line-through cursor-pointer' : 'cursor-pointer'}`} >{task.title}</span>
                <div className='w-40'><span className={` ${task.completed ? 'line-through cursor-pointer' : 'cursor-pointer'}`}>
                  Due Date: {formatDueDate(task.dueDate)}
                </span></div>
                
              </div>
              <div className="flex gap-4">                
                <FiEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent onClick
                    handleEdit(task._id);
                  }}
                />
                <FiTrash2
                  className="text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent onClick
                    deleteTask(task._id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
