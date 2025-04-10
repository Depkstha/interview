import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: (error) => {
        toast(error.message);
        return false;
      },
    },
    mutations: {
      throwOnError: (error) => {
        toast(error.message);
        return false;
      },
    },
  },
});