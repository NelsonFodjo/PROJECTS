import { useState } from "react"

export default function TaskForm({dispatch}){
    const [text, setText] = useState("")
    function handleSubmit(e){
        e.preventDefault();
        if (text.trim() === "") return ;
        dispatch({type : "ADD_TASK", payload : text});
        setText("");
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text"
            value={text}
            onChange={(e) => setText(e.target.value)} 
            placeholder="Add a new Task ..."/>
            <button></button>
        
        </form>
    
        </>
    )
}