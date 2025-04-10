import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import { queryClient } from '@/lib/queryClient';

type LoginData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axiosInstance.post('/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};