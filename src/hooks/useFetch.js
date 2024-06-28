import { useState, useEffect } from 'react';

const useFetch = (url) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            console.log(`Fetching data from ${url}`);
            const response = await fetch(url);
            const contentType = response.headers.get('content-type');
            console.log(`Content-Type: ${contentType}`);
            if (contentType && contentType.includes('application/json')) {
               const data = await response.json();
               setData(data);
            } else {
               const text = await response.text();
               throw new Error(`Unexpected response: ${text}`);
            }
         } catch (error) {
            console.error('Fetch error:', error);
            setError(error);
         } finally {
            setLoading(false);
         }
      };
      fetchData();
   }, [url]);

   return { data, loading, error };
};

export default useFetch;
