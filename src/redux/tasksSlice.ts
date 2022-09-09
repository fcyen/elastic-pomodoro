import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface TaskDetails {
    id: number,
    content: string,
    isCompleted: boolean,
}

interface TasksState {
    byId: TaskDetails[]
    allIds: number[],
    activeId: number,
}

const initialState: TasksState = {
    byId: [],
    allIds: [],
    activeId: -1,
};
let nextTaskId: number = 0;

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            if (nextTaskId === 0) {
                state.activeId = nextTaskId;
            }
            state.allIds.push(nextTaskId);
            state.byId.push({ 
                id: nextTaskId,
                content: action.payload,
                isCompleted: false, 
            });
            nextTaskId++;
        },
        toggleTaskIsCompleted: (state, action: PayloadAction<number>) => {
            const idx = state.allIds.indexOf(action.payload);
            const taskToToggle = state.byId[idx];
            taskToToggle.isCompleted = !taskToToggle.isCompleted;
        },
        updateActiveTask: (state, action: PayloadAction<number>) => {
            state.activeId = action.payload;
        }
    }
});

export const { 
    addTask, 
    toggleTaskIsCompleted, 
    updateActiveTask
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.byId;
export const selectActiveTaskId = (state: RootState) => state.tasks.activeId;
export const selectActiveTaskContent = (state: RootState) => {
    const { activeId, allIds, byId } = state.tasks;
    if (activeId != -1) {
        const idx = allIds.indexOf(activeId);
        return byId[idx].content;
    }
    return "";
};

export default tasksSlice.reducer;