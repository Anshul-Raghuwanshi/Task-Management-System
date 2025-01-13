import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext(null);

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = (props) => {

    const [task, setTask] = useState({
        _id: "",
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: "",
        assignedTo: "",
      });

    useEffect(() => {
        console.log("task", task);
        
      }, [task]);

    return <TaskContext.Provider value={{ task, setTask }}>
        {props.children}
    </TaskContext.Provider>
}