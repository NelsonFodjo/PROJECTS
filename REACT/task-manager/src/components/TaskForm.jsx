import { useState } from "react"

export default function TaskForm({dispatch}){
    const [text, setText] = useState("")
    function handleSubmit(e){
        e.preventDefault();
        if (text.trim() === "") return ;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        dispatch({type : "ADD_TASK", payload : newTask});
        setText("");
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text"
            value={text}
            onChange={(e) => setText(e.target.value)} 
            placeholder="Add a new Task ..."/>
            <button type="submit">Add</button>
        
        </form>
    
        </>
    )
}