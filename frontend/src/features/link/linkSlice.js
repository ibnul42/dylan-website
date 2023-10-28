import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import linkService from './linkService'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLinkCreated: false,
    isLinkGet: false,
    isAllLinks: false,
    isLinkEdited: false,
    isLinkDeleted: false,
    linkdata: null,
    links: [],
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

export const editLink = createAsyncThunk('link/edit', async(data, thunkAPI) => {
    try {
        return await linkService.editLink(data)
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

export const getLinkByName = createAsyncThunk('link/get-name', async(name, thunkAPI) => {
    try {
        return await linkService.getLinkByName(name)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllLink = createAsyncThunk('link/all-get', async(_, thunkAPI) => {
    try {
        return await linkService.getAllLinks()
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteLink = createAsyncThunk('link/delete', async(id, thunkAPI) => {
    try {
        return await linkService.deleteLink(id)
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
            state.isAllLinks = false
            state.isLinkEdited = false
            state.isLinkDeleted = false
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
             state.isLinkGet = true
             state.message = action.payload
             state.linkdata = null
        })
        .addCase(getLinkByName.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getLinkByName.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isLinkGet = true
            state.linkdata = action.payload
        })
        .addCase(getLinkByName.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.isLinkGet = true
             state.message = action.payload
             state.linkdata = null
        })
        .addCase(getAllLink.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllLink.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isAllLinks = true
            state.links = action.payload
        })
        .addCase(getAllLink.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.message = action.payload
        })
        .addCase(deleteLink.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteLink.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isLinkDeleted = true
            state.message = action.payload.message
        })
        .addCase(deleteLink.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.message = action.payload
        })
        .addCase(editLink.pending, (state) => {
            state.isLoading = true
        })
        .addCase(editLink.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isLinkEdited = true
            state.message = action.payload
        })
        .addCase(editLink.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.message = action.payload
        })
    }
})

export const { reset } = linkSlice.actions

export default linkSlice.reducer