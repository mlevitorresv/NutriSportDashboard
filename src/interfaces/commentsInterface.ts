export interface CommentInterface {
    name: string
    email: string
    comment: string
    date: Date
}


export interface CommentSliceInitialStateInterface{
    data: CommentInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | undefined
}