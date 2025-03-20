import {configureStore} from "@reduxjs/toolkit";
import {CipherReducer} from "../store/Cipher/CipherSlice.ts";

export const store = configureStore({
    reducer: {
        cipher: CipherReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;