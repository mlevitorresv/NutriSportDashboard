export interface BillsInterface{
    beneficiary: string
    description: string
    type: string
    paymentAmount: number
    date: Date
}

export interface BillSliceInitialStateInterface{
    data: BillsInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | undefined
}