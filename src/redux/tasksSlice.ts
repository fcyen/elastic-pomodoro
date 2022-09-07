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

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskDetails>) => {
            state.allIds.push(action.payload.id);
            state.byId.push(action.payload);
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

export default tasksSlice.reducer;