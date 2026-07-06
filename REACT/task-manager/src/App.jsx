import { useReducer } from "react";
import taskReducer from "./reducer";
import TaskForm from "./components/TaskForm";
const initialState = {id: Date.now(), tasks: [], completed : false}

export default function App(){
  
  const [state, dispatch] = useReducer(taskReducer, {initialState});
  cons
  
  
  return(
    <>
    <h1>Hi Nelson</h1>
    <TaskForm state/>
    </>
  )
}