import * as React from "react";
import styled from "styled-components";

const StyledTaskItem = styled.div<TaskItemProps>`
    line-height: 3em;
    background-color: ${props => props.isActive ? "#C9E5FF" : "#ECECEC"};
    margin: 0;
    margin-bottom: 5px;
    border-radius: 3px;
    padding-left: 15px;
    color: #7a7a7a;
    text-align: left;
    list-style-type: none;
    text-decoration: ${props => props.completed ? "line-through" : ""}
`
interface TaskItemProps {
    readonly isActive: boolean;
    readonly completed: boolean;
}

export default interface ITaskItem {
    id: number,
    content: string,
    isActive: boolean,
    updateActiveTaskId: any,
    moveToNextItem: () => void
}

export default class TaskItem extends React.Component<ITaskItem, {}> {
    completed: boolean;

    constructor(props: ITaskItem) {
        super(props);
        this.completed = false;
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck() {
        this.completed = !this.completed;
        if (this.completed === true) {
            this.props.moveToNextItem();
        }
    }

    render() {
        const { content, isActive, updateActiveTaskId } = this.props;
        return (
            <StyledTaskItem 
                isActive={isActive}
                onClick={updateActiveTaskId}
                completed={this.completed}
            >
                <input 
                    value={"test"} 
                    type="checkbox" 
                    style={{ marginRight: '10px' }} 
                    onChange={this.handleCheck}
                />
                {content}
            </StyledTaskItem>
        );
    }
}