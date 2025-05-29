import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as productApi from '../api/productApi';
import {  ProductFormData } from '../types/product';

 
export const useProducts= () => {
  return useQuery(['products'], productApi.getProducts);
}
 

export const useGetProductById = (id: string) =>
  useQuery(['product', id], () => productApi.getProductById(id), {
    enabled: !!id,
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(productApi.createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: { id: string; data: Partial<ProductFormData> }) =>
    productApi.updateProduct(id, data), {
    onSuccess: () => queryClient.invalidateQueries(['products']),
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(productApi.deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });
};
