import { createSlice } from "@reduxjs/toolkit";
import { BillSliceInitialStateInterface, BillsInterface } from "../../interfaces/billsInterface";
import { createBillToAPIThunk, deleteBillToAPIThunk, getBillFromAPIThunk, getBillListFromAPIThunk } from "./billsThunk";
import { RootState } from "../../app/store";

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

        builder.addCase(getBillFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getBillFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getBillFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(createBillToAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data.concat(action.payload)
        })
        .addCase(createBillToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(createBillToAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(deleteBillToAPIThunk.fulfilled , (state, action) => {
            state.status = "fulfilled"
            state.data = state.data.filter(bill => bill._id != action.payload)
        })
        .addCase(deleteBillToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(deleteBillToAPIThunk.pending, (state) => {
            state.status = "pending"
        })
    }
})

export const getBillData = (state: RootState): BillsInterface[] => state.bills.data;
export const getBillById = (state: RootState, id: String): BillsInterface | undefined=> state.bills.data.find((bill: BillsInterface) => bill._id === id);
export const getBillStatus = (state: RootState): string => state.bills.status;
export const getBillError  = (state: RootState): string | undefined => state.bills.error;
export const getShopBill = (state: RootState): BillsInterface[] => state.bills.data.filter((bill: BillsInterface) => bill.type === 'compra');
export const getRentBill = (state: RootState): BillsInterface[] => state.bills.data.filter((bill: BillsInterface) => bill.type === 'alquiler');
export const getPayrollBill = (state: RootState): BillsInterface[] => state.bills.data.filter((bill: BillsInterface) => bill.type === 'nómina');




