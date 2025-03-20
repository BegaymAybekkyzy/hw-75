import {createSlice} from "@reduxjs/toolkit";
import {submitMessageForEncryption, submitMessageForTranscription} from "./CipherThunks.ts";
import {RootState} from "../../app/store.ts";

interface CipherState {
    decodedMessage: string;
    encodeMessage: string;
    loading: boolean;
}

const initialState: CipherState = {
    decodedMessage: "",
    encodeMessage: "",
    loading: false,
};

export const selectEncodeMessage=
    (state: RootState) => state.cipher.encodeMessage;

export const selectDecodedMessage=
    (state: RootState) => state.cipher.decodedMessage;

export const selectLoading =
    (state: RootState)=> state.cipher.loading;


const cipherSlice = createSlice({
    name: "Cipher",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitMessageForEncryption.pending, state => {
                state.loading = true;
            })

            .addCase(submitMessageForEncryption.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.encodeMessage = payload.encoded;
            })

            .addCase(submitMessageForEncryption.rejected, state => {
                state.loading = false;
            })


            .addCase(submitMessageForTranscription.pending, state => {
                state.loading = true;
            })

            .addCase(submitMessageForTranscription.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.decodedMessage = payload.decoded;
            })

            .addCase(submitMessageForTranscription.rejected, state => {
                state.loading = false;
            });
    }
});

export const CipherReducer = cipherSlice.reducer;