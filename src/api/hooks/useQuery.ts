import {useQuery as useReactQuery} from "@tanstack/react-query";
import Cookie from "cookie-universal";

export const getHeaders = () => {
  const cookies = Cookie()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${cookies.get('token')}`,
  };
};
type GetQueryType = {
  path: string
  token?: boolean

}
const baseUrl = import.meta.env.VITE_PUBLIC_API_PATH
export const getQuery = async <T, >({path, token}: GetQueryType) => {

  const endpoint = `${baseUrl}${path}`;
  const res = await fetch(endpoint, {
    headers: token ? getHeaders() : undefined,
  });
  return res.json().then((r) => r as T);
};
type UseQueryConfig = {
  path: string
  skip?: boolean
  token?: boolean
}
export const useQuery = <T, >(config: UseQueryConfig) => {
  const {path, skip, token} = config
  const {data, isLoading,} = useReactQuery<T>({
    queryKey: [path],
    queryFn: () => getQuery<T>({path, token}),
    staleTime: Infinity,
    enabled: skip
  });
  return {data, isLoading};
};

