import React, { Component } from "react";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
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
                <ul id="tasklist">
                    {tasks.map((content, index) => <li 
                        key={index}
                        className={"futuretask " + ((index==activeTaskId) ? "activetask" : "")}
                        onClick={() => this.updateActiveTaskId(index, content)}
                    >{content}</li>)}
                </ul>
            </div>
        )
    }
}

export default TaskList;
