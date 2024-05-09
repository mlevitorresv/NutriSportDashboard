import { createSlice } from "@reduxjs/toolkit";
import { SupplierSliceInitialStateInterface, SupplierInterface } from "../../interfaces/suppliersInterface";
import { createSupplierToAPIThunk, deleteSupplierToAPIThunk, getSupplierFromAPIThunk, getSupplierListFromAPIThunk } from "./suppliersThunk";
import { RootState } from "../../app/store";

const initialState: SupplierSliceInitialStateInterface = {
    data: [],
    status: 'idle',
    error: undefined
}

export const supplierSlice = createSlice({
    name: "supplier",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getSupplierListFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getSupplierListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getSupplierListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        builder.addCase(getSupplierFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getSupplierFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getSupplierFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(createSupplierToAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data.push(...action.payload)
        })
        .addCase(createSupplierToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(createSupplierToAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(deleteSupplierToAPIThunk.fulfilled , (state, action) => {
            state.status = "fulfilled"
            state.data = state.data.filter(supplier => supplier._id != action.payload._id)
        })
        .addCase(deleteSupplierToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(deleteSupplierToAPIThunk.pending, (state) => {
            state.status = "pending"
        })
    }
})

export const getSupplierData = (state: RootState): SupplierInterface[] => state.supplier.data;
export const getSupplierById = (state: RootState, id: String): SupplierInterface | undefined=> state.supplier.data.find((supplier: SupplierInterface) => supplier._id === id);
export const getSupplierStatus = (state: RootState): string => state.supplier.status;
export const getSupplierError  = (state: RootState): string | undefined => state.supplier.error;
export const getSupplierProducts = (state: RootState): SupplierInterface[] => state.supplier.data.filter((supplier: SupplierInterface) => supplier.category === 'products');
export const getSupplierRent = (state: RootState): SupplierInterface[] => state.supplier.data.filter((supplier: SupplierInterface) => supplier.category === 'rent');




