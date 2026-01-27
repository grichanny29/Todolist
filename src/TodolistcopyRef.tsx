
import { Task } from "./commontypes";
import { Button } from "./Button";
import{FilterValuesType} from "./commontypes"
import { useRef } from "react";

type TodolistPropsType = {
  title: string
  tasks:Task [] 
  createTask: (title:Task['title'])=>void
  deleteTask:(taskId:Task['id'])=> void
  changeTodolistFilter:(nextFilterValue: FilterValuesType) => void
};
  



export const TodolistItem = ({title, tasks, deleteTask, changeTodolistFilter,createTask}:TodolistPropsType)=> {
const taskInputRef=useRef<HTMLInputElement>(null)

  const list = tasks.length === 0 ? <span>Your tasklist is empty</span>
  : <ul>
     {tasks.map(task => {
       return (
        <li>
              <input type="checkbox" checked={task.isDone}/> 
              <span>{task.title}</span>
              <Button title="x"onClick={()=> deleteTask(task.id)} />

        </li>
       )
     })}
  </ul>
 
  return(
    <div>
          <h3>{title}</h3>
          <div>
            <input ref={taskInputRef}/>
            <Button title="+" onClick={()=> {
               if(taskInputRef.current){
                createTask(taskInputRef.current.value)
                taskInputRef.current.value= ""
               }
            }}/>
           
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
             <Button title="All"onClick={()=>changeTodolistFilter("all")}/>
             <Button title="Active"onClick={()=>changeTodolistFilter("active")}/>
             <Button title="Completed"onClick={()=>changeTodolistFilter("completed")}/>
          </div>
        </div>
  )
};