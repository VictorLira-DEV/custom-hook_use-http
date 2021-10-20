import { useRef } from "react"

interface Iprops {
    onAddTasks: (a: {}) => void
}


const AddNewTask = (props: Iprops) => {
    const enteredTask = useRef<HTMLInputElement>(null)

    const newTask = async(event:React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const currentTask = enteredTask.current!.value
        if(currentTask.length < 5){
            return
        }
        await fetch('https://react-http-d779a-default-rtdb.firebaseio.com/tasks.json', {
        method: 'POST',
        body: JSON.stringify({text: currentTask}),
        headers: {"Content-Type": "application/json"}
        })
        props.onAddTasks({text: currentTask})
        enteredTask.current!.value = ''
    }


    return(
        <div className="control">
            <label htmlFor="task"> Add new task </label>
            <input type="text" ref={enteredTask} id="task" placeholder="new task"/>
            <button onClick={newTask}>Send task</button>
        </div>
    )
}

export default AddNewTask