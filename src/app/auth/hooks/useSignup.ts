// features/auth/hooks/useSignup.ts
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import { queryClient } from '@/lib/queryClient';
import { SignUpParams } from '@/types';

export const useSignup = () => {

  return useMutation({
    mutationFn: async (data: SignUpParams) => {
      const response = await axiosInstance.post('/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data.token, data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};