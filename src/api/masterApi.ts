import { CommonResponse } from '../types/master';
import axios from './axiosInstance';
// catetory
export const getCategoryList = async () => axios.get<CommonResponse>('/category-list');
export const getBrandList= async () => axios.get<CommonResponse>('/brand-list');
export const getVariantAttributesList= async () => axios.get<CommonResponse>('/variant-attributes-list');
export const getVariantAttributesValueList= async () => axios.get<CommonResponse>('/variant-attributes-values-list');

// export const getCategoryById = (id: string) => axios.get<Category>(`/category/${id}`);
// export const createUser = (data: Partial<User>) => axios.post('/users', data);
// export const updateUser = (id: string, data: Partial<User>) => axios.put(`/users/${id}`, data);
// export const deleteUser = (id: string) => axios.delete(`/users/${id}`);
