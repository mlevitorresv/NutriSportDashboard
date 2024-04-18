import { createSlice } from "@reduxjs/toolkit";
import { SaleSliceInitialStateInterface, SaleInterface } from "../../interfaces/salesInterface";
import { createSaleToAPIThunk, deleteSaleToAPIThunk, getSaleFromAPIThunk, getSaleListFromAPIThunk } from "./salesThunk";
import { RootState } from "../../app/store";

const initialState: SaleSliceInitialStateInterface = {
    data: [],
    status: 'idle',
    error: undefined
}

export const saleSlice = createSlice({
    name: "sale",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getSaleListFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getSaleListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getSaleListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        builder.addCase(getSaleFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getSaleFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getSaleFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(createSaleToAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data.push(...action.payload)
        })
        .addCase(createSaleToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(createSaleToAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(deleteSaleToAPIThunk.fulfilled , (state, action) => {
            state.status = "fulfilled"
            state.data = state.data.filter(sale => sale._id != action.payload._id)
        })
        .addCase(deleteSaleToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(deleteSaleToAPIThunk.pending, (state) => {
            state.status = "pending"
        })
    }
})

export const getSaleData = (state: RootState): SaleInterface[] => state.sale.data;
export const getSaleById = (state: RootState, id: String): SaleInterface | undefined=> state.sale.data.find((sale: SaleInterface) => sale._id === id);
export const getSaleStatus = (state: RootState): string => state.sale.status;
export const getSaleError  = (state: RootState): string | undefined => state.sale.error;




