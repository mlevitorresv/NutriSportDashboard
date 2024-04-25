import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { commentSlice } from "../features/comments/commentsSlice";
import { billSlice } from "../features/bills/billsSlice";
import { customerSlice } from "../features/customers/customersSlice";
import { employeeSlice } from "../features/employees/employeesSlice";
import { productSlice } from "../features/products/productsSlice";
import { saleSlice } from "../features/sales/salesSlice";
import { supplierSlice } from "../features/suppliers/suppliersSlice";



export const store = configureStore({
    reducer: {
        comment: commentSlice.reducer,
        bills: billSlice.reducer,
        customer: customerSlice.reducer,
        employee: employeeSlice.reducer,
        product: productSlice.reducer,
        sale: saleSlice.reducer,
        supplier: supplierSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector