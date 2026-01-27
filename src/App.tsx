import { useState } from 'react';
import './App.css';
import { TodolistItem } from './TodolistItem';
import { Task } from './commontypes';
import { FilterValuesType } from './commontypes';
import { v1 } from 'uuid';

export const App = () => {
  const todolistTitle: string = 'What to learn';

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ]);

  const deleteTask = (taskId: Task['id']) => {
    const nextState = tasks.filter((task) => task.id !== taskId);
    setTasks(nextState);
  };

  const createTask = (title: Task['title']) => {
    const newTask: Task = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const nextState: Task[] = [...tasks, newTask];
    setTasks(nextState);
  };

  const changeTasksStatus = (
    taskId: Task['id'],
    newTasksStatus: Task['isDone']
  ) => {
    const nextState = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: newTasksStatus } : task
    );
    setTasks(nextState);
  };

  const [filter, setFilter] = useState<FilterValuesType>('all');
  const changeTodolistFilter = (nextFilterValue: FilterValuesType) => {
    const nextState = nextFilterValue;
    setFilter(nextState);
  };

  let filtredTasks: Task[] = tasks;
  if (filter === 'active') {
    filtredTasks = tasks.filter((task) => task.isDone === false);
  }
  if (filter === 'completed') {
    filtredTasks = tasks.filter((task) => task.isDone === true);
  }

  return (
    <div className="app">
      <TodolistItem
        title={todolistTitle}
        tasks={filtredTasks}
        filter={filter}
        deleteTask={deleteTask}
        changeTodolistFilter={changeTodolistFilter}
        createTask={createTask}
        changeTasksStatus={changeTasksStatus}
      />
    </div>
  );
};

export default App;
