const API_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint: string, method: string = 'GET', body: object | null, token: string | null) => {

    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json'
        };

        if (token)
            headers['Authorization'] = `Bearer ${token}`

        const requestOptions = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        }

        const response = await fetch(`${API_URL}${endpoint}`, requestOptions)

        if (!response.ok) 
            throw new Error(`Error en la solicitud: ${response.status}: ${response.statusText}`);

        if(endpoint === 'login')
            return await response.json()

        return response;

    } catch (error) {
        throw new Error('Network Error')
    }

}