import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiCall";
import { CustomerInterface } from "../../interfaces/customersInterface";


export const getCustomerListFromAPIThunk = createAsyncThunk<CustomerInterface[], void, { state: any, rejectValue: string }>("customers/getCustomersFromApi", async (): Promise<CustomerInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest('customers', 'GET', null, token);
        const responseData = await response.json();
        return responseData.customers;
    } catch (error) {
        throw new Error('Error al obtener la lista de clientes desde la API')
    }
})

export const getCustomerFromAPIThunk = createAsyncThunk<CustomerInterface[], string | undefined, { state: any, rejectValue: string }>("customers/getCustomerFromAPI", async (id): Promise<CustomerInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`customers/${id}`, 'GET', null, token);
        const responseData = await response.json();
        return responseData.customer;
    } catch (error) {
        throw new Error('Error al obtener el cliente desde la API')
    }
})

export const createCustomerToAPIThunk = createAsyncThunk("customers/createCustomerToApi", async (body: CustomerInterface): Promise<CustomerInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest('customers', 'POST', body, token);
        const responseData = await response.json();
        return responseData.customers;
    } catch (error) {
        throw new Error('Error al crear el cliente')
    }
})

export const deleteCustomerToAPIThunk = createAsyncThunk<string, string, { rejectValue: string }>(
    "customers/deleteCustomerToApi",
    async (id: string, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await apiRequest(`customers/${id}`, 'DELETE', null, token);
            if (!response.ok){
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Error al eliminar el cliente')
            }
            return id
        } catch (error) {
            throw new Error('Error al eliminar el cliente')
        }
    })