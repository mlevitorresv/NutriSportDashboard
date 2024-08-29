import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiCall";
import { SupplierInterface } from "../../interfaces/suppliersInterface";


export const getSupplierListFromAPIThunk = createAsyncThunk<SupplierInterface[], void, { state: any, rejectValue: string }>("suppliers/getSuppliersFromApi",  async (): Promise<SupplierInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response  = await apiRequest('suppliers', 'GET', null, token);
        const responseData = await response.json();
        return responseData.suppliers;
    } catch (error) {
        throw new Error('Error al obtener la lista de proveedores desde la API')
    }
})

export const getSupplierFromAPIThunk = createAsyncThunk<SupplierInterface[], string | undefined, { state: any, rejectValue: string }>("suppliers/getSupplierFromAPI", async(id): Promise<SupplierInterface[]> => {
    try{
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`suppliers/${id}`, 'GET', null, token);
        const responseData = await response.json();
        return responseData.supplier;
    }catch(error){
        throw new Error('Error al obtener el proveedor desde la API')
    }
})

export const createSupplierToAPIThunk = createAsyncThunk("suppliers/createSupplierToApi", async (body: SupplierInterface): Promise<SupplierInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest('suppliers', 'POST', body, token);
        const responseData = await response.json();
        return responseData.suppliers;
    } catch (error) {
        throw new Error('Error al crear el proveedor')
    }
})

export const deleteSupplierToAPIThunk = createAsyncThunk<string, string, { rejectValue: string }>(
    "suppliers/deleteSupplierToApi",
    async (id: string, { rejectWithValue })=> {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`suppliers/${id}`, 'DELETE', null, token);
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message || 'Error al eliminar el proveedor')
        }
        return id;
    } catch (error) {
        throw rejectWithValue('Error al eliminar el proveedor')
    }
})