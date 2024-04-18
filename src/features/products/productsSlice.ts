import { createSlice } from "@reduxjs/toolkit";
import { ProductSliceInitialStateInterface, ProductInterface } from "../../interfaces/productsInterface";
import { createProductToAPIThunk, deleteProductToAPIThunk, getProductFromAPIThunk, getProductListFromAPIThunk } from "./productsThunk";
import { RootState } from "../../app/store";

const initialState: ProductSliceInitialStateInterface = {
    data: [],
    status: 'idle',
    error: undefined
}

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getProductListFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getProductListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getProductListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        builder.addCase(getProductFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getProductFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getProductFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(createProductToAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data.push(...action.payload)
        })
        .addCase(createProductToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(createProductToAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(deleteProductToAPIThunk.fulfilled , (state, action) => {
            state.status = "fulfilled"
            state.data = state.data.filter(product => product._id != action.payload._id)
        })
        .addCase(deleteProductToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(deleteProductToAPIThunk.pending, (state) => {
            state.status = "pending"
        })
    }
})

export const getProductData = (state: RootState): ProductInterface[] => state.product.data;
export const getProductById = (state: RootState, id: String): ProductInterface | undefined=> state.product.data.find((product: ProductInterface) => product._id === id);
export const getProductStatus = (state: RootState): string => state.product.status;
export const getProductError  = (state: RootState): string | undefined => state.product.error;




