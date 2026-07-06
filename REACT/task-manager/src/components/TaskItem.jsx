export default function TaskItem({ task }){
    return (
        <li className={task.completed ? "task-item completed" : "task-item"}>
            <span>{task.text}</span>
        </li>
    )
}