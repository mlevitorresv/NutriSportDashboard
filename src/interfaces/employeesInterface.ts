export interface EmployeeInterface{
    _id: string | undefined
    name: string
    photo: string
    birth: Date
    gender : string
    DNI: string
    email: string
    password: string
    phone: string
    postalCode: number
    address: string
    job: string
    startDate: Date
    contract: string
    active: boolean
    socialSecurity: number
    bankAccount: string
}

export interface EmployeeSliceInitialStateInterface{
    data: EmployeeInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | undefined
}