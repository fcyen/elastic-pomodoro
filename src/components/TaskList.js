import React, { useState, useEffect } from "react";
import TaskItem from './TaskItem';

function TaskList(props) {
    const [tasks, setTasks] = useState([]);
    const [activeTaskId, setActiveTaskId] = useState(-1);

    const updateActiveTaskId = (id, content) => {
        setActiveTaskId(id);
        props.updateCurrentTask(content);
    }

    const moveToNextItem = (id) => {
        if (id < tasks.length) { // not the last task
            const newId = id + 1;
            const newContent = tasks[newId];
            updateActiveTaskId(newId, newContent);
        }
    }

    const handleEnter = e => {
        if (e.key === "Enter") {
            const taskInput = e.target;
            // if it's the first task added, update the current task too
            if (tasks.length === 0) {
                props.updateCurrentTask(taskInput.value);
            }
            setTasks(tasks.concat(taskInput.value));
            taskInput.value = '';
        }
    };

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
                {tasks.map((content, index) =>
                    <TaskItem
                        key={index}
                        id={index}
                        content={content}
                        isActive={index==activeTaskId}
                        updateActiveTaskId={() => updateActiveTaskId(index, content)}
                        moveToNextItem={() => moveToNextItem(index, content)}
                    />
                )}
            </div>
        </div>
    );
}

export default TaskList;
