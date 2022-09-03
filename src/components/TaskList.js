import React, { Component } from "react";
import TaskItem from './TaskItem';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [], // list of task contents
            activeTaskId: 0,
        }
    }
    
    componentDidMount() {
        const taskInput = document.getElementById("tasklist-input");
        taskInput.addEventListener("keyup", e => {
            if (e.key === "Enter") {
                // if it's the first task added, update the current task too
                if (this.state.tasks.length === 0) {
                    this.props.updateCurrentTask(taskInput.value);
                }

                this.setState(prevState => ({
                    tasks: [...prevState.tasks, taskInput.value]
                }));
                taskInput.value = '';
            }
        });
    }

    updateActiveTaskId(id, content) {
        this.setState({
            activeTaskId: id,
        });
        this.props.updateCurrentTask(content);
    }

    moveToNextItem(id, content) {
        if (id < this.state.tasks.length) { // not the last task
            const newId = id + 1;
            const newContent = this.state.tasks[newId];
            this.updateActiveTaskId(newId, newContent);
        }
    }

    render() {
        const { tasks, activeTaskId } = this.state;
        const { updateCurrentTask } = this.props;

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
                            updateActiveTaskId={() => this.updateActiveTaskId(index, content)}
                            moveToNextItem={() => this.moveToNextItem(index, content)}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default TaskList;
