import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body: object = {}
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const source = axios.CancelToken.source();

  useEffect(() => {
    setIsLoading(true);
    axios({
      url: url,
      method: method,
      withCredentials: true,
      data: body,
      headers: {
        'Content-Type': 'application/json'
      },
      cancelToken: source.token
    }).then(({ data }) => setData(data))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
        source.cancel('Request Aborted');
      });

    return () => {
      source.cancel('Cleanup!');
    }
  }, [url, method]);

  return {
    data: data,
    isLoading: isLoading,
    error: error
  };
};

export default useAxios;