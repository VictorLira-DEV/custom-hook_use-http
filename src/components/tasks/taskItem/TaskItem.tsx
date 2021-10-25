import classes from "./styles/TaskItem.module.css";

interface ITaskItem {
    text: string;
}

const TaskItem = (props: ITaskItem) => {
    return <li className={classes["task-item"]}>text: {props.text}</li>;
};

export default TaskItem;
