import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiCall";
import { ProductInterface } from "../../interfaces/productsInterface";


export const getProductListFromAPIThunk = createAsyncThunk<ProductInterface[], void, { state: any, rejectValue: string }>("products/getProductsFromApi",  async (): Promise<ProductInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response  = await apiRequest('products', 'GET', null, token);
        const responseData = await response.json();
        return responseData.products;
    } catch (error) {
        throw new Error('Error al obtener la lista de productos desde la API')
    }
})

export const getProductFromAPIThunk = createAsyncThunk<ProductInterface[], string | undefined, { state: any, rejectValue: string }>("products/getProductFromAPI", async(id): Promise<ProductInterface[]> => {
    try{
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`products/${id}`, 'GET', null, token);
        const responseData = await response.json();
        return responseData.product;
    }catch(error){
        throw new Error('Error al obtener el producto desde la API')
    }
})

export const createProductToAPIThunk = createAsyncThunk("products/createProductToApi", async (body: ProductInterface): Promise<ProductInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest('products', 'POST', body, token);
        const responseData = await response.json();
        return responseData.products;
    } catch (error) {
        throw new Error('Error al crear el producto')
    }
})

export const deleteProductToAPIThunk = createAsyncThunk<string, string, { rejectValue: string }>(
    "products/deleteProductToApi",
    async (id: string, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`products/${id}`, 'DELETE', null, token);
        if (!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message || 'Error al eliminar el producto')
        }
        return id;
    } catch (error) {
        return rejectWithValue('Error al eliminar el producto')
    }
})