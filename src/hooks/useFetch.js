import { useState, useEffect } from 'react';

const useFetch = (endpoint) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         console.log(`Fetching data from ${endpoint}`);
         try {
            const response = await fetch(endpoint);
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
         } catch (error) {
            console.error('Fetch error:', error);
            setError(error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [endpoint]);

   return { data, loading, error };
};

export default useFetch;
