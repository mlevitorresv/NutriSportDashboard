export interface SupplierInterface{
    _id: string | undefined
    name: string
    postalCode: number
    phone: string
    email: string
    web: string
    category : string
}


export interface SupplierSliceInitialStateInterface{
    data: SupplierInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | undefined
}