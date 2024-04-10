export interface BillsInterface{
    _id: string | undefined,
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