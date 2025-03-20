import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IData, IDecodedMessage, IEncodedMessage} from "../../types";

export const submitMessageForEncryption =
    createAsyncThunk<IEncodedMessage, IData>(
    "cipher/submitMessageForEncryption",
    async (data) => {
        const response = await axiosAPI.post("encode", data);
        return response.data;
    }
);

export const submitMessageForTranscription = createAsyncThunk<IDecodedMessage, IData> (
    "cipher/submitMessageForTranscription",
    async (data) => {
        const response = await axiosAPI.post("decode", data);
        return response.data;
    }
)