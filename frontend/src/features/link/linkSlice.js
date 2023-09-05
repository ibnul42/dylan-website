import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import linkService from './linkService'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLinkCreated: false,
    isLinkGet: false,
    linkdata: null,
    message: ''
}

export const createLink = createAsyncThunk('link/create', async(data, thunkAPI) => {
    try {
        return await linkService.createLink(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getLink = createAsyncThunk('link/get', async(id, thunkAPI) => {
    try {
        return await linkService.getLink(id)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const linkSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isLinkCreated = false
            state.isLinkGet = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createLink.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createLink.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isLinkCreated = true
            state.linkdata = action.payload
        })
        .addCase(createLink.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.message = action.payload
             state.linkdata = null
        })
        .addCase(getLink.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getLink.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isLinkGet = true
            state.linkdata = action.payload
        })
        .addCase(getLink.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.message = action.payload
             state.linkdata = null
        })
    }
})

export const { reset } = linkSlice.actions

export default linkSlice.reducer