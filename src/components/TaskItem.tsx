import * as React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { toggleTaskIsCompleted, updateActiveTask } from "../redux/tasksSlice";

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
    isCompleted: boolean,
}

function TaskItem(props: ITaskItem) {
    const dispatch = useAppDispatch();
    const { id, content, isActive, isCompleted } = props;

    return (
        <StyledTaskItem 
            isActive={isActive}
            onClick={() => dispatch(updateActiveTask(id))}
            completed={isCompleted}
        >
            <input 
                value={"test"} 
                type="checkbox" 
                style={{ marginRight: '10px' }} 
                onChange={() => dispatch(toggleTaskIsCompleted(id))}
            />
            {content}
        </StyledTaskItem>
    );
}

export default TaskItem;
