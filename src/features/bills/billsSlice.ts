import { createSlice } from "@reduxjs/toolkit";
import { BillSliceInitialStateInterface } from "../../interfaces/billsInterface";
import { createBillToAPIThunk, deleteBillToAPIThunk, getBillListFromAPIThunk } from "./billsThunk";

const initialState: BillSliceInitialStateInterface = {
    data: [],
    status: 'idle',
    error: undefined
}

export const billSlice = createSlice({
    name: "bill",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getBillListFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getBillListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getBillListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(createBillToAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data.push(...action.payload)
        })
        .addCase(getBillListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getBillListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(deleteBillToAPIThunk.fulfilled , (state, action) => {
            state.status = "fulfilled"
            state.data = state.data.filter(bill => bill._id != action.payload._id)
        })
        .addCase(getBillListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getBillListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })
    }
})