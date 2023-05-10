import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import assetService from './assetService'
// get user from local storage
// const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isFolderGet: false,
    isFolderCreated: false,
    isAssetget: false,
    message: '',
    folders: [],
    assets: []
}

// get all folders
export const getFolders = createAsyncThunk('asset/get-dirs', async(thunkAPI) => {
    try {
        return await assetService.getFolders()
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create folders
export const createFolder = createAsyncThunk('asset/create-dir', async(inputText, thunkAPI) => {
    try {
        // console.log(inputText)
        return await assetService.createFolder(inputText)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all images
export const getImages = createAsyncThunk('asset/all-images', async(type, thunkAPI) => {
    try {
        // console.log(inputText)
        return await assetService.getImages(type)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isFolderCreated = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFolders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFolders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.folders = action.payload
            })
            .addCase(getFolders.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })
            .addCase(createFolder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createFolder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isFolderCreated = true
            })
            .addCase(createFolder.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })
            .addCase(getImages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.assets = action.payload
            })
            .addCase(getImages.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })
    }
})

export const { reset } = assetSlice.actions

export default assetSlice.reducer
