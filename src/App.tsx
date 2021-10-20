import AddNewTask from "./components/AddNewTask";
import TaskList from './components/TaskList'
import { useState, useEffect } from "react";

interface ITaskListData {
    id: string;
    text: string;
}
function App() {
    const [allTasks, setAllTasks] = useState<ITaskListData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState({
        hasError: false,
        message: "",
    });

    const addTask = (task: {}) => {
        console.log(task);
    };

    useEffect(() => {
        const taskListData: ITaskListData[] = [];

        try {
            const fetchTasks = async () => {
                const response = await fetch(
                    "https://react-http-d779a-default-rtdb.firebaseio.com/tasks.json"
                );
                if (!response.ok) {
                    throw new Error("something went");
                }
                const data = await response.json();
                for (const task in data) {
                    taskListData.push({ id: task, text: data[task].text });
                }
                setAllTasks(taskListData)
                setIsLoading(false);
  
            };

            fetchTasks();
        } catch (error) {
            setHttpError({ hasError: true, message: "Something went wrong" });
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="app">
            <AddNewTask onAddTasks={addTask} />
            <TaskList tasks={allTasks} />
        </div>
    );
}

export default App;
