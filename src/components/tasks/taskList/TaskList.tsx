import React from "react";
import TaskItem from "../taskItem/TaskItem";
import classes from "./styles/TaskList.module.css";

interface ITaskList {
    items: {
        id: string;
        text: string;
    }[];
}

const TaskList = (props: ITaskList) => {
    return (
        <ul className={classes["task-list"]}>
            {props.items.map((item) => {
                return <TaskItem key={item.id} text={item.text} />;
            })}
        </ul>
    );
};

export default TaskList;
