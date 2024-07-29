import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/getTasks/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ taskId, newStatus }) => {
  try {
    const response = await axios.patch(`http://localhost:4000/api/v1/updateTaskStatus`, { taskId,status: newStatus });
    return response.data;
  } catch (error) {
    // console.log("call hi nhi gyi")
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.currentUser.token;
  await axios.delete(`http://localhost:4000/api/v1/deleteTask/${taskId}`, { data: { token } });
  return taskId;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add more synchronous actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
        console.log("tasks fetched from slice: ", state.tasks )
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(task => task._id === updatedTask._id);
        if (index !== -1) {
          state.tasks[index].status = updatedTask.status;
        }
      });
  },
});

export default taskSlice.reducer;
