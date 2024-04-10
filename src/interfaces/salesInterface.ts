export interface SaleInterface{
    customer: string
    employee: string
    products: string
    date: Date
    payMethod: string
    invoiceNumber: number
}

export interface SaleSliceInitialStateInterface{
    data: SaleInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | undefined
}