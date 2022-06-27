import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const deleteTaskHandler = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
      for (const key in tasksObj) {
        loadedTasks.push({
          id: key,
          ...tasksObj[key],
        });
      }
      console.log(loadedTasks);
      setTasks(loadedTasks);
    };
    const requestConfig = {
      url: "https://my-first-page-1f193-default-rtdb.firebaseio.com/tasks.json",
    };
    fetchTasks(requestConfig, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDeleteTask={deleteTaskHandler}
      />
    </React.Fragment>
  );
}

export default App;
