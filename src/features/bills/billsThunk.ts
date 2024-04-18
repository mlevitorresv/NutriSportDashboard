import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiCall";
import { BillsInterface } from "../../interfaces/billsInterface";


export const getBillListFromAPIThunk = createAsyncThunk<BillsInterface[], void, { state: any, rejectValue: string }>("bills/getBillsFromApi",  async (): Promise<BillsInterface[]> => {
    try {
        const token = localStorage.getItem('token');
        const response  = await apiRequest('bills', 'GET', null, token);
        const responseData = await response.json();
        return responseData.bills;
    } catch (error) {
        throw new Error('Error al obtener la lista de facturas desde la API')
    }
})

export const getBillFromAPIThunk = createAsyncThunk<BillsInterface[], string | undefined, { state: any, rejectValue: string }>("bills/getBillFromAPI", async(id): Promise<BillsInterface[]> => {
    try{
        const token = localStorage.getItem('token');
        const response = await apiRequest(`bills/${id}`, 'GET', null, token);
        const responseData = await response.json();
        return responseData.bill;
    }catch(error){
        throw new Error('Error al obtener la factura desde la API')
    }
})

export const createBillToAPIThunk = createAsyncThunk("bills/createBillToApi", async (body: BillsInterface): Promise<BillsInterface[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiRequest('bills', 'POST', body, token);
        const responseData = await response.json();
        return responseData.bills;
    } catch (error) {
        throw new Error('Error al crear la factura')
    }
})

export const deleteBillToAPIThunk = createAsyncThunk<BillsInterface, string, { state: any, rejectValue: string }>("bills/deleteBillToApi", async (id: any): Promise<BillsInterface> => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiRequest(`bills/${id}`, 'DELETE', null, token);
        const responseData = await response.json();
        return responseData.success;
    } catch (error) {
        throw new Error('Error al eliminar la factura')
    }
})