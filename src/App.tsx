import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import TasksList from "./components/tasks/taskList/TaskList";
import NewItem from "./components/tasks/newItem/NewItem";

interface ISendRequest {
    id: string;
    text: string;
}

function App() {
    const { sendRequest: getRequest } = useHttp();
    const [tasks, setTasks] = useState<ISendRequest[]>([]);

    useEffect(() => {
        const transformData = (tasks: any) => {
            const transformedData: ISendRequest[] = [];
            for (const i in tasks) {
                transformedData.push({ id: i, text: tasks[i].text });
            }
            setTasks(transformedData);
        };

        getRequest(
            {
                url: "https://react-http-d779a-default-rtdb.firebaseio.com/tasks.json",
            },
            transformData
        );
    }, []);

    const addNewTask = (newTask: { id: string; text: string }) => {
        setTasks((prev) => {
            const newTasks = [...prev];
            return newTasks.concat(newTask);
        });
    };

    return (
        <React.Fragment>
            <main>
                <NewItem onAddNewTask={addNewTask} />
                <TasksList items={tasks} />
            </main>
        </React.Fragment>
    );
}

export default App;
