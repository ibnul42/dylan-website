import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
    event : null,
    dateEvents:null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isDeleted: false,
    isEdited: false,
    isSingleEvent: false,
    isAllEvents: false,
    isEventsBydate: false,
    message: ''
}

// single Event
export const singleEvent = createAsyncThunk('event/single-event', async(date, thunkAPI) => {
    try {
        return await eventService.singleEvent(date)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const eventsByDate = createAsyncThunk('event/events-date', async(date, thunkAPI) => {
    try {
        return await eventService.eventsByDate(date)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getEvent = createAsyncThunk('event/get-event', async(id, thunkAPI) => {
    try {
        return await eventService.getEvent(id)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// all Event
export const allEvent = createAsyncThunk('event/all-event', async(_, thunkAPI) => {
    try {
        return await eventService.allEvent()
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create Event
export const createEvent = createAsyncThunk('event/create-event', async(data, thunkAPI) => {
    try {
        return await eventService.createEvent(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete Event
export const deleteEvent = createAsyncThunk('event/delete-event', async(id, thunkAPI) => {
    try {
        return await eventService.deleteEvent(id)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update Event
export const updateEvent = createAsyncThunk('event/update-event', async(data, thunkAPI) => {
    try {
        return await eventService.updateEvent(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.isDeleted = false
            state.isEdited = false
            state.isSingleEvent = false
            state.isAllEvents = false
            state.isEventsBydate = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(singleEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(singleEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.event = action.payload
            })
            .addCase(singleEvent.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
                 state.event = null
            })
            .addCase(eventsByDate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(eventsByDate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dateEvents = action.payload
                state.isEventsBydate = true
            })
            .addCase(eventsByDate.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
                 state.dateEvents = null
            })
            .addCase(getEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.event = action.payload
                state.isSingleEvent = true
            })
            .addCase(getEvent.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
                 state.event = null
            })
            .addCase(allEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.event = action.payload
                state.message = null
                state.isAllEvents = true
            })
            .addCase(allEvent.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
                 state.event = null
            })
            .addCase(createEvent.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.event = action.payload
            })
            .addCase(createEvent.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
                 state.event = null
            })            
            .addCase(deleteEvent.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isDeleted = true
                state.event = action.payload
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
                 state.event = null
            })                       
            .addCase(updateEvent.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isEdited = true
                state.message = action.payload
            })
            .addCase(updateEvent.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer