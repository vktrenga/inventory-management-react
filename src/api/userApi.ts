import axios from './axiosInstance';
import { User } from '../types/user';

export const getUsers = () => axios.get<User[]>('/users');
export const getUserById = (id: string) => axios.get<User>(`/users/${id}`);
export const createUser = (data: Partial<User>) => axios.post('/users', data);
export const updateUser = (id: string, data: Partial<User>) => axios.put(`/users/${id}`, data);
export const deleteUser = (id: string) => axios.delete(`/users/${id}`);

export const loginUser = async (data: { username: string; password: string }) => {
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);
   return await axios.post('/login', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        if (response) {
            return response;
        }
        throw new Error('No response received');
    }).catch((error) => {
        console.error('Error logging in:', error);
        throw error;
    });


};
