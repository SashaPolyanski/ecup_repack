import {useMutation as useReactQuery} from "@tanstack/react-query";


const baseUrl = import.meta.env.VITE_PUBLIC_API_PATH
type MethodType = 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type MutationType = {
  path: string
  method: MethodType
  queryKeyRefetch?: string
}
type FetcherType<T> = {
  args: T;
  path: string
  method: MethodType
};
export const fetcher = async <T, >(config: FetcherType<T>) => {
  const {method, path, args} = config

  return await fetch(`${baseUrl}${path}/`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
}

export const useMutation = <T, D>(config: MutationType) => {
  const {path, method} = config
  const {
    mutateAsync: mutate, isPending: loading, data, error, status,
  } = useReactQuery({
    mutationFn: (args: T) => fetcher<T>({path, method, args}),
    onError: (error) => {
      console.log(error)
    }
  });
  return {
    mutate, loading, data: data as D, error, status
  };
};
