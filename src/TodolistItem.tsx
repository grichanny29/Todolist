import { Task } from './commontypes';
import { Button } from './Button';
import { FilterValuesType } from './commontypes';
import { useState } from 'react';

type TodolistPropsType = {
  title: string;
  tasks: Task[];
  filter: FilterValuesType;
  createTask: (title: Task['title']) => void;
  deleteTask: (taskId: Task['id']) => void;
  changeTodolistFilter: (nextFilterValue: FilterValuesType) => void;
  changeTasksStatus: (
    taskId: Task['id'],
    newTasksStatus: Task['isDone']
  ) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  filter,
  deleteTask,
  changeTodolistFilter,
  createTask,
  changeTasksStatus,
}: TodolistPropsType) => {
  const [taskInput, setTaskInput] = useState('');
  const [error, setError] = useState(false);

  const list =
    tasks.length === 0 ? (
      <span>Your tasklist is empty</span>
    ) : (
      <ul>
        {tasks.map((task) => {
          return (
            <li className={task.isDone ? 'task-done' : 'task'}>
              <input
                type="checkbox"
                onChange={(e) =>
                  changeTasksStatus(task.id, e.currentTarget.checked)
                }
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <Button title="x" onClick={() => deleteTask(task.id)} />
            </li>
          );
        })}
      </ul>
    );

  const createTaskHandler = () => {
    const trimmedTitle = taskInput.trim();
    if (trimmedTitle) {
      createTask(taskInput);
    } else setError(true);
    setTaskInput('');
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          placeholder="поле ввода"
          value={taskInput}
          onChange={(e) => {
            error && setError(false);
            if (e.currentTarget.value.length < 12)
              setTaskInput(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createTaskHandler();
            }
          }}
          className={error ? 'input-error' : ''}
        />

        <Button
          disabled={taskInput.length === 0 || taskInput.length > 10}
          title="+"
          onClick={createTaskHandler}
        />

        {taskInput && taskInput.length <= 10 && <div>mast be 10</div>}
        {taskInput && taskInput.length > 10 && (
          <div style={{ color: 'red' }}>title is too long</div>
        )}
        {error && <div style={{ color: 'red' }}>enter valid title</div>}
      </div>

      {list}
      {/* <ul>
            <li>
              <input type="checkbox" checked={true}/> <span>HTML&CSS</span>
            </li>
            <li>
              <input type="checkbox" checked={true}/> <span>JS</span>
            </li>
            <li>
              <input type="checkbox" checked={false}/> <span>React</span>
            </li>
          </ul> */}
      <div>
        <Button
          title="Все"
          className={filter === 'all' ? 'btn-filter-active' : ''}
          onClick={() => changeTodolistFilter('all')}
        />
        <Button
          title="В работе"
          className={filter === 'active' ? 'btn-filter-active' : ''}
          onClick={() => changeTodolistFilter('active')}
        />
        <Button
          title="Сделано"
          className={filter === 'completed' ? 'btn-filter-active' : ''}
          onClick={() => changeTodolistFilter('completed')}
        />
      </div>
    </div>
  );
};
