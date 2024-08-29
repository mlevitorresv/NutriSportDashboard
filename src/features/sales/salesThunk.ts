import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiCall";
import { SaleInterface } from "../../interfaces/salesInterface";


export const getSaleListFromAPIThunk = createAsyncThunk<SaleInterface[], void, { state: any, rejectValue: string }>("sales/getSalesFromApi",  async (): Promise<SaleInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response  = await apiRequest('sales', 'GET', null, token);
        const responseData = await response.json();
        return responseData.sales;
    } catch (error) {
        throw new Error('Error al obtener la lista de ventas desde la API')
    }
})

export const getSaleFromAPIThunk = createAsyncThunk<SaleInterface[], string | undefined, { state: any, rejectValue: string }>("sales/getSaleFromAPI", async(id): Promise<SaleInterface[]> => {
    try{
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`sales/${id}`, 'GET', null, token);
        const responseData = await response.json();
        return responseData.sale;
    }catch(error){
        throw new Error('Error al obtener la venta desde la API')
    }
})

export const createSaleToAPIThunk = createAsyncThunk("sales/createSaleToApi", async (body: SaleInterface): Promise<SaleInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest('sales', 'POST', body, token);
        const responseData = await response.json();
        return responseData.sales;
    } catch (error) {
        throw new Error('Error al crear la venta')
    }
})

export const deleteSaleToAPIThunk = createAsyncThunk<string, string, { rejectValue: string }>(
    "sales/deleteSaleToApi",
     async (id: string, { rejectWithValue })=> {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`sales/${id}`, 'DELETE', null, token);
        if (!response.ok){
            const errorData = await response.json()
            return rejectWithValue(errorData.message || 'Error al eliminar la venta')
        }
        return id;
    } catch (error) {
        throw new Error('Error al eliminar la venta')
    }
})