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
    nextTaskId: number,
}

const initialState: TasksState = {
    byId: [],
    allIds: [],
    activeId: -1,
    nextTaskId: 0,
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            let nextTaskId = state.nextTaskId;
            if (nextTaskId === 0) {
                state.activeId = nextTaskId;
            }
            state.allIds.push(nextTaskId);
            state.byId.push({ 
                id: nextTaskId,
                content: action.payload,
                isCompleted: false, 
            });
            state.nextTaskId++;
        },
        toggleTaskIsCompleted: (state, action: PayloadAction<number>) => {
            const idx = state.allIds.indexOf(action.payload);
            const taskToToggle = state.byId[idx];
            taskToToggle.isCompleted = !taskToToggle.isCompleted;

            // move on to the next item if task has been completed
            if (taskToToggle.isCompleted) {
                const nextTask = state.byId.find(task => 
                    !task.isCompleted && task.id !== action.payload 
                    // isCompleted for the task hasn't been written yet, so it is still an uncompleted task
                );
                state.activeId = nextTask?.id || -1;
            }
        },
        updateActiveTask: (state, action: PayloadAction<number>) => {
            state.activeId = action.payload;
        },
        deleteAllTasks: () => {
            return initialState;
        }
    }
});

export const { 
    addTask, 
    toggleTaskIsCompleted, 
    updateActiveTask,
    deleteAllTasks,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.byId;
export const selectActiveTaskId = (state: RootState) => state.tasks.activeId;
export const selectActiveTaskContent = (state: RootState) => {
    const { activeId, allIds, byId } = state.tasks;
    if (activeId !== -1) {
        const idx = allIds.indexOf(activeId);
        return byId[idx].content;
    }
    return "";
};

export default tasksSlice.reducer;