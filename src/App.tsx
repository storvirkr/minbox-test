import React, { useState } from 'react';
interface Task {
  id: number;
  text: string;
  done: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [tab, setTab] = useState<boolean | null>(null)
  
  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTasks = [...tasks, { id: Date.now(), text: newTask, done: false }];
    setTasks(newTasks);
    setNewTask('');
  };

  const deleteAllTasks = () => {
    setTasks([]);
  }

  const markTaskAsDone = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };
  
  const filteredTasks = (done: boolean | null) => {
    if (done === null) return tasks;
    return tasks.filter(task => task.done === done);
  };
    
  return (
    <div className="flex flex-col items-center">
      <h1>TODO App</h1>
      <div className='flex flex-row'>
      <input
        className='border-2 solid m-2 border-black rounded-md'
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        />
      <button className='border-2 solid rounded-md border-black' onClick={addTask}>Add Task</button>
        </div>

      <div className='min-h-20'>
      <ul className='grid gap-2 grid-cols-2 justify-between'>
        {filteredTasks(tab).map(task => (
          <>
          <li key={task.id} className={task.done ? 'line-through' : ''}>
            <span>{task.text}</span>
          </li>
            <li>
            <button className={task.done ? "border-2 solid rounded-md ml-2 border-black active:bg-green-400" : "border-2 solid rounded-md ml-2 border-black active:bg-green-400"} onClick={() => markTaskAsDone(task.id)}>
              {task.done ? 'Undone' : 'Done'}
            </button>
            </li>
          </>
        ))}
      </ul>
        </div>

      <div>
        <button className='border-2 solid rounded-md p-1 m-1 border-black focus:outline-none focus:ring focus:ring-green-300'  onClick={() => setTab(null)}>All({tasks.length})</button>
        <button className='border-2 solid rounded-md p-1 m-1 border-black focus:outline-none focus:ring focus:ring-green-300'  onClick={() => setTab(false)}>Undone</button>
        <button className='border-2 solid rounded-md p-1 m-1 border-black focus:outline-none focus:ring focus:ring-green-300'  onClick={() => setTab(true)}>Done</button>
        <button className='border-2 solid rounded-md p-1 m-1 border-black hover:bg-red-600'  onClick={() => deleteAllTasks()}>Delete all tasks</button>
      </div>
    </div>
  );
};

export default App;