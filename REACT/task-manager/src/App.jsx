import { useReducer } from "react";
import taskReducer from "./reducer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList"

const initialState = {
  tasks : [],
};

export default function App(){
  
  const [state, dispatch] = useReducer(taskReducer, initialState);
  
  return(
    <>
    <h1>Task Manager</h1>
    <TaskForm dispatch={dispatch} />
    <TaskList tasks={state.tasks} dispatch={dispatch} />
    </>
  )
}