import axios from './axiosInstance';
import { ProductFormData } from '../types/product';
import { CommonResponse } from '../types/master';

export const getProducts = () => axios.get<CommonResponse>('/products');
export const getProductById = (id: string) => axios.get<CommonResponse>(`/product/${id}`);
export const createProduct = (data: Omit<Partial<ProductFormData>, 'id'>) => axios.post('/product', data);
export const updateProduct = (id: string, data: Partial<ProductFormData>) => axios.put(`/product/${id}`, data);
export const deleteProduct = (id: string) => axios.delete(`/product/${id}`);
