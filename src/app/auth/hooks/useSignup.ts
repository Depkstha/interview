// features/auth/hooks/useSignup.ts
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import { queryClient } from '@/lib/queryClient';

type SignupData = {
  name: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await axiosInstance.post('/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};