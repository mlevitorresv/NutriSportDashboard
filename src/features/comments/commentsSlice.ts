import { createSlice } from "@reduxjs/toolkit";
import { CommentSliceInitialStateInterface, CommentInterface } from "../../interfaces/commentsInterface";
import { deleteCommentToAPIThunk, getCommentFromAPIThunk, getCommentListFromAPIThunk } from "./commentsThunk";
import { RootState } from "../../app/store";

const initialState: CommentSliceInitialStateInterface = {
    data: [],
    status: 'idle',
    error: undefined
}

export const commentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getCommentListFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getCommentListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getCommentListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        builder.addCase(getCommentFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getCommentFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getCommentFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(deleteCommentToAPIThunk.fulfilled , (state, action) => {
            state.status = "fulfilled"
            state.data = state.data.filter(comment => comment._id != action.payload)
        })
        .addCase(deleteCommentToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(deleteCommentToAPIThunk.pending, (state) => {
            state.status = "pending"
        })
    }
})

export const getCommentData = (state: RootState): CommentInterface[] => state.comment.data;
export const getCommentById = (state: RootState, id: String): CommentInterface | undefined=> state.comment.data.find((comment: CommentInterface) => comment._id === id);
export const getCommentStatus = (state: RootState): string => state.comment.status;
export const getCommentError  = (state: RootState): string | undefined => state.comment.error;




