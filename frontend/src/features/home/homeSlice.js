import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import homeService from "./homeService"

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  timelines: null,
  isAllTimelines: false,
  isSingleTimeline: false,
  isTimelineDeleted: false,
  activities: null,
  isAllActivities: false,
  isSingleActivity: false,
  isActivityDeleted: false
}

export const getAllTimeline = createAsyncThunk(
  "home/get-timelines",
  async (_, thunkAPI) => {
    try {
      return await homeService.getAllTimeline()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createTimeline = createAsyncThunk(
  "home/create-timeline",
  async (data, thunkAPI) => {
    try {
      return await homeService.createTimeline(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteTimeline = createAsyncThunk(
  "home/delete-timeline",
  async (id, thunkAPI) => {
    try {
      return await homeService.deleteTimeline(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAllActivities = createAsyncThunk(
  "home/get-activities",
  async (_, thunkAPI) => {
    try {
      return await homeService.getAllActivities()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createActivity = createAsyncThunk(
  "home/create-activity",
  async (data, thunkAPI) => {
    try {
      return await homeService.createActivity(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteActivity = createAsyncThunk(
  "home/delete-activity",
  async (id, thunkAPI) => {
    try {
      return await homeService.deleteActivity(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const authSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
      state.isAllTimelines = false
      state.isAllActivities = false
      state.isSingleActivity = false
      state.isSingleTimeline = false
      state.isTimelineDeleted = false
      state.isActivityDeleted = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTimeline.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTimeline.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.timelines = action.payload
        state.isAllTimelines = true
      })
      .addCase(getAllTimeline.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.timelines = null
      })
      .addCase(createTimeline.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTimeline.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.timelines = action.payload
        state.isSingleTimeline = true
      })
      .addCase(createTimeline.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.timelines = null
      })
      .addCase(getAllActivities.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTimeline.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTimeline.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isTimelineDeleted = true
        state.timelines = action.payload
      })
      .addCase(deleteTimeline.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.timelines = null
      })
      .addCase(getAllActivities.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.activities = action.payload
        state.isAllActivities = true
      })
      .addCase(getAllActivities.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.activities = null
      })
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.activities = action.payload
        state.isSingleActivity = true
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.activities = null
      })
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isActivityDeleted = true
        state.activities = action.payload
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.activities = null
      })
  },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
