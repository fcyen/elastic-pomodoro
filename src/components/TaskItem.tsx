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

export interface ITaskItem {
    id: number,
    content: string,
    isActive: boolean,
    updateActiveTaskId: any,
    moveToNextItem: () => void
}

function TaskItem(props: ITaskItem) {
    let isCompleted: boolean = false;
    const { content, isActive, updateActiveTaskId } = props;

    const handleCheck = () => {
        isCompleted = !isCompleted;
        if (isCompleted) {
            props.moveToNextItem();
        }
    }

    return (
        <StyledTaskItem 
            isActive={isActive}
            onClick={updateActiveTaskId}
            completed={isCompleted}
        >
            <input 
                value={"test"} 
                type="checkbox" 
                style={{ marginRight: '10px' }} 
                onChange={handleCheck}
            />
            {content}
        </StyledTaskItem>
    );
}

export default TaskItem;
