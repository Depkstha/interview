import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import { queryClient } from '@/lib/queryClient';
import { LogInParams } from '@/types';


export const useLogin = () => {

  return useMutation({
    mutationFn: async (data: LogInParams) => {
      const response = await axiosInstance.post('/login', data);
      return response.data?.data;
    },
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data.token, data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};