import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiCall";
import { CommentInterface } from "../../interfaces/commentsInterface";


export const getCommentListFromAPIThunk = createAsyncThunk<CommentInterface[], void, { state: any, rejectValue: string }>("comments/getCommentsFromApi",  async (): Promise<CommentInterface[]> => {
    try {
        const token = localStorage.getItem('token');
        const response  = await apiRequest('comments', 'GET', null, token);
        const responseData = await response.json();
        return responseData.comments;
    } catch (error) {
        throw new Error('Error al obtener la lista de comentarios desde la API')
    }
})

export const getCommentFromAPIThunk = createAsyncThunk<CommentInterface[], string | undefined, { state: any, rejectValue: string }>("comments/getCommentFromAPI", async(id): Promise<CommentInterface[]> => {
    try{
        const token = localStorage.getItem('token');
        const response = await apiRequest(`comments/${id}`, 'GET', null, token);
        const responseData = await response.json();
        return responseData.comment;
    }catch(error){
        throw new Error('Error al obtener el comentario desde la API')
    }
})

export const deleteCommentToAPIThunk = createAsyncThunk<CommentInterface, string, { state: any, rejectValue: string }>("comments/deleteCommentToApi", async (id: any): Promise<CommentInterface> => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiRequest(`comments/${id}`, 'DELETE', null, token);
        const responseData = await response.json();
        return responseData.success;
    } catch (error) {
        throw new Error('Error al eliminar el comentario')
    }
})