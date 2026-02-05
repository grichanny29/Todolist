  import { useState } from 'react';
import './App.css';
import { TodolistItem } from './TodolistItem';
import { Task } from './commontypes';
import { FilterValuesType,TodolistType,TasksStateType  } from './commontypes';
import { v1 } from 'uuid';


// CRUD

export const App = () => {
  // BLL

  const todolistId_1=v1()
  const todolistId_2=v1()

   const[todolists,setTodolists]=useState<TodolistType[]>([
    {id:todolistId_1,title:'What to learn',filter:'all'},
    {id:todolistId_2,title:'What to Buy',filter:'all'},
  ])


const [tasks,setTasks]= useState<TasksStateType>({
    [todolistId_1]:[ 
                     { id: v1(), title: 'HTML&CSS', isDone: true },
                     { id: v1(), title: 'JS', isDone: true },
                     { id: v1(), title: 'React', isDone: false },
                     ],

    [todolistId_2]:[
                     { id: v1(), title: 'Meat', isDone: true },
                     { id: v1(), title: 'Milk', isDone: true },
                     { id: v1(), title: 'Bread', isDone: false },
                    ],
})


  const deleteTask = (taskId: Task['id'],todolistId:TodolistType['id']) => {
    // 1.Иммютабельное создание новго состояния (nextState)
   const currentTasksArray:Task[]=tasks[todolistId] 
   const filteredCurrentTasks:Task[]=currentTasksArray.filter(t=>t.id !==taskId)
   const nextState:TasksStateType= {...tasks}

   nextState[todolistId]=filteredCurrentTasks
    // 2.Передать nextState для перерисовки в React c помощью setState
    setTasks(nextState);
  };

  const createTask = (title: Task['title'],todolistId:TodolistType['id']) => {  
    const newTask: Task = {
      id: v1(),
      title: title,
      isDone: false,
    };
  const currentTaskArray:Task[]=tasks[todolistId]
  const addedCurrentTasks = [...currentTaskArray,newTask]
  const nextState= {...tasks}
  nextState[todolistId]= addedCurrentTasks
    setTasks(nextState);
  };

  const changeTasksStatus = (taskId: Task['id'],newTasksStatus: Task['isDone'],todolistId:TodolistType['id']) => {
  //  Имютабельное создания нового состояния и передать nextState для перерисовки в React c помощью setState
    setTasks({...tasks,[todolistId]:tasks[todolistId].map(task =>
      task.id === taskId ? { ...task, isDone: newTasksStatus } : task)});
  };


 const changeTodolistFilter = (nextFilterValue: FilterValuesType,todolistId:TodolistType['id']) => {
  const nextState:TodolistType[]=todolists.map(tl=>tl.id===todolistId ? {...tl,filter:nextFilterValue}:tl)
    setTodolists(nextState)
  };

 const deleteTodolist=(todolistId:TodolistType['id'])=> {
  const nextState=todolists.filter(tl=>tl.id!==todolistId)
  setTodolists( nextState)
  const copyTasksState= {...tasks}
  delete copyTasksState[todolistId]
  setTasks(copyTasksState)
 }

  // GUI

  const todolistComponents=todolists.map(tl=> {

  let filtredTasks: Task[] = tasks[tl.id];
  if (tl.filter === 'active') {
    filtredTasks = filtredTasks.filter((task) => task.isDone === false);
  }
  if (tl.filter === 'completed') {
    filtredTasks = filtredTasks.filter((task) => task.isDone === true);
  }

    return(
       <TodolistItem
       todolistId={tl.id}
       key={tl.id}
        title={tl.title}
        tasks={filtredTasks}
        filter={tl.filter}
        deleteTodolist={deleteTodolist}
        deleteTask={deleteTask}
        changeTodolistFilter={changeTodolistFilter}
        createTask={createTask}
        changeTasksStatus={changeTasksStatus}
      />
    )
  })
 
  
  return (
    <div className="app">
      {todolistComponents}
    </div>
  );
};

export default App;
