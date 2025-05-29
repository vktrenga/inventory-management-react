import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as userApi from '../api/userApi';
import { date } from 'yup';
import axios from 'axios';

export const useUsers = () =>
  useQuery(['users'], userApi.getUsers);

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(userApi.createUser, {
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};


// export const useLogin= () => {
//   const queryClient = useQueryClient();
//   return useMutation(data) => userApi.loginUser(date), {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['login']);
//     }
//   });
// };


export const useLogin =  () => {
  const queryClient = useQueryClient();
  return  useMutation(userApi.loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['token']);
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });
};

// export const useLogin = () => {
//   return useMutation(async (data: { username: string; password: string }) => {
//     const response = await axios.post("login", data);
//     return response.data;
//   });
// };