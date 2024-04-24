import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiCall";
import { EmployeeInterface } from "../../interfaces/employeesInterface";


export const getEmployeeListFromAPIThunk = createAsyncThunk<EmployeeInterface[], void, { state: any, rejectValue: string }>("employees/getEmployeesFromApi",  async (): Promise<EmployeeInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response  = await apiRequest('employees', 'GET', null, token);
        const responseData = await response.json();
        return responseData.employees;
    } catch (error) {
        throw new Error('Error al obtener la lista de empleados desde la API')
    }
})

export const getEmployeeFromAPIThunk = createAsyncThunk<EmployeeInterface[], string | undefined, { state: any, rejectValue: string }>("employees/getEmployeeFromAPI", async(id): Promise<EmployeeInterface[]> => {
    try{
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`employees/${id}`, 'GET', null, token);
        const responseData = await response.json();
        return responseData.employee;
    }catch(error){
        throw new Error('Error al obtener el empleado desde la API')
    }
})

export const createEmployeeToAPIThunk = createAsyncThunk("employees/createEmployeeToApi", async (body: EmployeeInterface): Promise<EmployeeInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest('employees', 'POST', body, token);
        const responseData = await response.json();
        return responseData.employees;
    } catch (error) {
        throw new Error('Error al crear el empleado')
    }
})

export const deleteEmployeeToAPIThunk = createAsyncThunk<EmployeeInterface, string, { state: any, rejectValue: string }>("employees/deleteEmployeeToApi", async (id: any): Promise<EmployeeInterface> => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`employees/${id}`, 'DELETE', null, token);
        const responseData = await response.json();
        return responseData.success;
    } catch (error) {
        throw new Error('Error al eliminar el empleado')
    }
})