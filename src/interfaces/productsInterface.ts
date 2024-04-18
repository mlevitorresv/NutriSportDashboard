export interface ProductInterface{
    _id: string | undefined
    name: string
    description: string
    SKU: string
    brand: string
    category: string
    PVP: number
    stock: number
    photos: string[]
    ingredients: string
    energy: number
    fats: number
    carbohydrates: number
    proteins: number
    salt: number
    weight: number
    dimensions: string
    instructions: string
}

export interface ProductSliceInitialStateInterface{
    data: ProductInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | undefined
}