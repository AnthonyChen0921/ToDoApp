import classes from "./TaskItem.module.css";
import Button from "../UI/Button";
import useHttp from "../../hooks/use-http";

const TaskItem = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const deleteTask = () => {
    props.OnDeleteTask(props.id);
  };
  const deleteHandler = async () => {
    sendRequest(
      {
        url: `https://my-first-page-1f193-default-rtdb.firebaseio.com/tasks/${props.id}.json`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      },
      deleteTask
    );
  };

  return (
    <li className={classes.task}>
      {props.children}
      {error && <p>{error}</p>}
      <Button onClick={deleteHandler}>{isLoading ? '...' : 'X'}</Button>
    </li>
  );
};

export default TaskItem;
