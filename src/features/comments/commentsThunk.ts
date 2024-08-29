import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiCall";
import { CommentInterface } from "../../interfaces/commentsInterface";


export const getCommentListFromAPIThunk = createAsyncThunk<CommentInterface[], void, { state: any, rejectValue: string }>("comments/getCommentsFromApi",  async (): Promise<CommentInterface[]> => {
    try {
        const token = sessionStorage.getItem('token');
        const response  = await apiRequest('comments', 'GET', null, token);
        const responseData = await response.json();
        return responseData.comments;
    } catch (error) {
        throw new Error('Error al obtener la lista de comentarios desde la API')
    }
})

export const getCommentFromAPIThunk = createAsyncThunk<CommentInterface[], string | undefined, { state: any, rejectValue: string }>("comments/getCommentFromAPI", async(id): Promise<CommentInterface[]> => {
    try{
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`comments/${id}`, 'GET', null, token);
        const responseData = await response.json();
        return responseData.comment;
    }catch(error){
        throw new Error('Error al obtener el comentario desde la API')
    }
})

export const deleteCommentToAPIThunk = createAsyncThunk<string, string, { rejectValue: string }>(
    "comments/deleteCommentToApi",
    async (id: string, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await apiRequest(`comments/${id}`, 'DELETE', null, token);
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message || 'Error al eliminar el comentario');
        }
        return id;
    } catch (error) {
        throw rejectWithValue('Error al eliminar el comentario')
    }
})