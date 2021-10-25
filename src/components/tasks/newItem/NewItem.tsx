import React, { useRef } from "react";
import classes from "./styles/NewItem.module.css";
import useHttp from "../../../hooks/use-http";

interface INewItem {
    onAddNewTask: (a: { id: string; text: string }) => void;
}

const NewItem = (props: INewItem) => {
    const newTask = useRef<HTMLInputElement>(null);
    const { sendRequest: postRequest } = useHttp();

    const addNewItem = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (newTask.current!.value.trim().length < 5) {
            return;
        }

        const apply = (data: any) => {
            const newItem = { id: data.name, text: newTask.current!.value };
            props.onAddNewTask(newItem);
            newTask.current!.value = "";
        };

        postRequest(
            {
                url: "https://react-http-d779a-default-rtdb.firebaseio.com/tasks.json",
                method: "POST",
                body: JSON.stringify({ text: newTask.current!.value }),
                headers: { "Content-Type": "application/json" },
            },
            apply
        );
    };

    return (
        <form>
            <div className={classes["form-control"]}>
                <label>Add a new task</label>
                <input type="text" ref={newTask} />
            </div>
            <button onClick={addNewItem}>add task</button>
        </form>
    );
};

export default NewItem;
