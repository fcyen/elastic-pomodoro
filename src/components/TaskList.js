import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import TaskItem from './TaskItem';
import { addTask, selectActiveTaskId, selectTasks } from "../redux/tasksSlice";

function TaskList(props) {
    const dispatch = useAppDispatch();
    
    const tasks = useAppSelector(selectTasks);
    const activeTaskId = useAppSelector(selectActiveTaskId);

    const handleEnter = e => {
        if (e.key === "Enter") {
            const taskInput = e.target;
            dispatch(addTask(taskInput.value));
            taskInput.value = '';
        }
    }

    useEffect(() => {
        const taskInput = document.getElementById("tasklist-input");
        taskInput.addEventListener("keyup", handleEnter);
        return () => {
            taskInput.removeEventListener("keyup", handleEnter);
        }
    }, [handleEnter]);

    return (
        <div id="tasklist-container">
            <input 
                id="tasklist-input" 
                type="text" 
                className="addtask" 
                placeholder="Add task" 
            ></input>
            <div id="tasklist">
                {tasks.map((task) =>
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        content={task.content}
                        isActive={task.id===activeTaskId}
                        isCompleted={task.isCompleted}
                    />
                )}
            </div>
        </div>
    );
}

export default TaskList;
