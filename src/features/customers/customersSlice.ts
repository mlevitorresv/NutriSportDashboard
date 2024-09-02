import { createSlice } from "@reduxjs/toolkit";
import { CustomerSliceInitialStateInterface, CustomerInterface } from "../../interfaces/customersInterface";
import { createCustomerToAPIThunk, deleteCustomerToAPIThunk, getCustomerFromAPIThunk, getCustomerListFromAPIThunk } from "./customersThunk";
import { RootState } from "../../app/store";

const initialState: CustomerSliceInitialStateInterface = {
    data: [],
    status: 'idle',
    error: undefined
}

export const customerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getCustomerListFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getCustomerListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getCustomerListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        builder.addCase(getCustomerFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getCustomerFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getCustomerFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(createCustomerToAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data.push(...action.payload)
        })
        .addCase(createCustomerToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(createCustomerToAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(deleteCustomerToAPIThunk.fulfilled , (state, action) => {
            state.status = "fulfilled"
            state.data = state.data.filter(customer => customer._id != action.payload)
        })
        .addCase(deleteCustomerToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(deleteCustomerToAPIThunk.pending, (state) => {
            state.status = "pending"
        })
    }
})

export const getCustomerData = (state: RootState): CustomerInterface[] => state.customer.data;
export const getCustomerById = (state: RootState, id: String): CustomerInterface | undefined=> state.customer.data.find((customer: CustomerInterface) => customer._id === id);
export const getCustomerStatus = (state: RootState): string => state.customer.status;
export const getCustomerError  = (state: RootState): string | undefined => state.customer.error;
export const getMensCustomer = (state: RootState): CustomerInterface[] => state.customer.data.filter((customer: CustomerInterface) => customer.gender === 'male');
export const getWomensCustomer = (state: RootState): CustomerInterface[] => state.customer.data.filter((customer: CustomerInterface) => customer.gender === 'female');
export const getOthersCustomer = (state: RootState): CustomerInterface[] => state.customer.data.filter((customer: CustomerInterface) => customer.gender === 'other');





