export interface CustomerInterface{
    name: string,
    email: string
    phone: string
    postalCode: number
    birth: Date
    gender : string
}

export interface CustomerSliceInitialStateInterface{
    data: CustomerInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | undefined
}