import { createSlice } from "@reduxjs/toolkit";
import { EmployeeSliceInitialStateInterface, EmployeeInterface } from "../../interfaces/employeesInterface";
import { createEmployeeToAPIThunk, deleteEmployeeToAPIThunk, getEmployeeFromAPIThunk, getEmployeeListFromAPIThunk } from "./employeesThunk";
import { RootState } from "../../app/store";

const initialState: EmployeeSliceInitialStateInterface = {
    data: [],
    status: 'idle',
    error: undefined
}

export const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getEmployeeListFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getEmployeeListFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getEmployeeListFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        builder.addCase(getEmployeeFromAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
        .addCase(getEmployeeFromAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getEmployeeFromAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(createEmployeeToAPIThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data.push(...action.payload)
        })
        .addCase(createEmployeeToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(createEmployeeToAPIThunk.pending, (state) => {
            state.status = "pending"
        })

        .addCase(deleteEmployeeToAPIThunk.fulfilled , (state, action) => {
            state.status = "fulfilled"
            state.data = state.data.filter(employee => employee._id != action.payload)
        })
        .addCase(deleteEmployeeToAPIThunk.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(deleteEmployeeToAPIThunk.pending, (state) => {
            state.status = "pending"
        })
    }
})

export const getEmployeeData = (state: RootState): EmployeeInterface[] => state.employee.data;
export const getEmployeeById = (state: RootState, id: String): EmployeeInterface | undefined=> state.employee.data.find((employee: EmployeeInterface) => employee._id === id);
export const getEmployeeStatus = (state: RootState): string => state.employee.status;
export const getEmployeeError  = (state: RootState): string | undefined => state.employee.error;
export const getMensEmployee = (state: RootState): EmployeeInterface[] => state.employee.data.filter((employee: EmployeeInterface) => employee.gender === 'male');
export const getWomensEmployee = (state: RootState): EmployeeInterface[] => state.employee.data.filter((employee: EmployeeInterface) => employee.gender === 'female');
export const getOthersEmployee = (state: RootState): EmployeeInterface[] => state.employee.data.filter((employee: EmployeeInterface) => employee.gender === 'other');





