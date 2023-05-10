import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import clientReducer from "../features/client/clientSlice"
import eventReducer from "../features/event/eventSlice"
import homeReducer from "../features/home/homeSlice"
import assetReducer from "../features/asset/assetSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    client: clientReducer,
    home: homeReducer,
    asset: assetReducer,
  },
})
