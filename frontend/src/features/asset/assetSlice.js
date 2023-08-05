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
    isFolderDeleted: false,
    isAssetget: false,
    isAssetAdded: false,
    isAssetDeleted: false,
    message: '',
    folders: [],
    assets: [],
    thumb: null,
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
        return await assetService.createFolder(inputText)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all images
export const getImages = createAsyncThunk('asset/all-images', async(type, thunkAPI) => {
    try {
        return await assetService.getImages(type)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add images
export const addAssets = createAsyncThunk('asset/add-assets', async(data, thunkAPI) => {
    try {
        return await assetService.addAssets(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// remove image
export const removeAsset = createAsyncThunk('asset/remove-asset', async(data, thunkAPI) => {
    try {
        return await assetService.removeAsset(data)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// remove folder
export const removeFolder = createAsyncThunk('asset/remove-folder', async(dir, thunkAPI) => {
    try {
        return await assetService.removeFolder(dir)
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all assets
export const getAssets = createAsyncThunk('asset/all-assets', async( thunkAPI) => {
    try {
        return await assetService.getAssets()
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
            state.isAssetAdded = false
            state.isAssetDeleted = false
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
                state.assets = action.payload.images
                state.thumb = action.payload.thumb
            })
            .addCase(getImages.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })  
            .addCase(getAssets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAssets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.assets = action.payload
            })
            .addCase(getAssets.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })           
            .addCase(addAssets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addAssets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isAssetAdded = true
                state.message = action.payload.msg
            })
            .addCase(addAssets.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })        
            .addCase(removeAsset.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeAsset.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isAssetDeleted = true
                state.message = action.payload.msg
            })
            .addCase(removeAsset.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })      
            .addCase(removeFolder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeFolder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isFolderDeleted = true
                state.message = action.payload.msg
            })
            .addCase(removeFolder.rejected, (state, action) => {
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
            })
    }
})

export const { reset } = assetSlice.actions

export default assetSlice.reducer
