const TaskList = (props: any) => {
    return(
        <ul>
            {props.tasks.map((task: any) => {
                return(
                    <li>
                        <p>Text: {task.text} </p>
                    </li>
                )
            })}
        </ul>
    )
}

export default TaskList;